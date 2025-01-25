/* eslint-disable max-depth */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable complexity */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable sonarjs/cognitive-complexity */
/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import type { SemanticNode, Token } from 'intertation'
import {
  getRelPath,
  isAnnotationSpec,
  isInterface,
  isProp,
  isRef,
  isStructure,
  ItnDocument,
  ItnRepo,
  resolveItnFromPath,
} from 'intertation'
import type {
  CompletionItem,
  createConnection,
  Hover,
  MarkupContent,
  Position,
  Range,
  SemanticTokens,
  TextDocuments,
  WorkspaceEdit,
} from 'vscode-languageserver/node'
import {
  CompletionItemKind,
  DiagnosticSeverity,
  DiagnosticTag,
  ParameterInformation,
  SemanticTokensBuilder,
  SignatureInformation,
} from 'vscode-languageserver/node'
import type { TextDocument } from 'vscode-languageserver-textdocument'

import { addImport, charBefore, createInsertTextRule, getItnFileCompletions } from './utils'

const CHECKS_DELAY = 100

export class VscodeItnRepo extends ItnRepo {
  private readonly changeQueue = [] as string[]

  private readonly revalidateQueue = [] as string[]

  private readonly pendingCheck = new Set<string>()

  private readonly changedSet = new Set<string>()

  private idle = true

  checksDelay = CHECKS_DELAY

  currentCheck?: Promise<void>

  constructor(
    private readonly connection: ReturnType<typeof createConnection>,
    private readonly documents: TextDocuments<TextDocument>
  ) {
    super()
    this.documents.onDidChangeContent(change => {
      this.addToChangeQueue(change.document.uri)
    })

    documents.listen(connection)
    connection.listen()

    connection.onNotification('workspace/files', async (fileUris: string[]) => {
      fileUris.forEach(uri => {
        this.addToRevalidateQueue(uri)
      })
      this.checksDelay = 1
      this.triggerChecks()
      await this.currentCheck
      this.checksDelay = CHECKS_DELAY
    })

    connection.onDefinition(async params => {
      const itnDoc = await this.openDocument(params.textDocument.uri)
      return itnDoc.getToDefinitionAt(params.position.line, params.position.character)
    })

    connection.onReferences(async params => {
      const itnDoc = await this.openDocument(params.textDocument.uri)
      return itnDoc.getUsageListAt(params.position.line, params.position.character)?.map(r => ({
        uri: r.uri,
        range: r.range,
      }))
    })

    connection.onRenameRequest(async params => {
      const { textDocument, position, newName } = params

      // Open the document and find the token at the cursor
      const itnDoc = await this.openDocument(textDocument.uri)
      if (this.currentCheck) {
        await this.currentCheck
      }
      const token = itnDoc.tokensIndex.at(position.line, position.character)
      if (!token) {
        return null // No token found at the cursor
      }
      const references = itnDoc.usageListFor(token)

      if (!references || references.length === 0) {
        return null // No references found
      }

      const def = token.isDefinition ? { uri: itnDoc.id, token } : itnDoc.getDefinitionFor(token)

      if (def?.token) {
        references.push({
          uri: def.uri,
          range: def.token.range,
          token,
        })
      }

      // Build a response with edits for each reference
      const changes: WorkspaceEdit['changes'] = {}

      references.forEach(ref => {
        if (!changes[ref.uri]) {
          changes[ref.uri] = []
        }

        changes[ref.uri]!.push({
          range: ref.range,
          newText: newName,
        })
      })

      return { changes }
    })

    connection.onCompletionResolve(item => item)

    connection.onCompletion(async params => {
      const { textDocument, position, context } = params
      const document = documents.get(textDocument.uri)
      if (!document) {
        return
      }
      const text = document.getText()
      const offset = document.offsetAt(position)
      const itnDoc = await this.openDocument(textDocument.uri)
      await this.currentCheck

      const block = itnDoc.blocksIndex.at(position.line, position.character)

      // import { here } from '...'
      if (block?.blockType === 'import' && block.fromPath) {
        return this.getImportBlockCompletions(itnDoc, block, text, offset, context?.triggerKind)
      }

      const token = itnDoc.tokensIndex.at(position.line, position.character)
      // import { ... } from 'here'
      if (typeof token?.fromPath === 'string') {
        return this.getImportPathCompletions(itnDoc, token, position)
      }

      // autocomplete for annotations
      if (itnDoc.config.annotations) {
        // eslint-disable-next-line unicorn/no-lonely-if
        if (token?.isAnnotation && itnDoc.config.annotations) {
          const prev = token.text.slice(1).split('.').slice(0, -1)
          let a = itnDoc.config.annotations
          for (const item of prev) {
            if (a[item] && !isAnnotationSpec(a[item])) {
              a = a[item]
            } else {
              return
            }
          }
          return Object.keys(a).flatMap(key => {
            const options = [
              {
                label: key,
                kind: CompletionItemKind.Folder,
                insertText: `${key}.`,
                command: {
                  command: 'editor.action.triggerSuggest',
                  title: 'Trigger Suggest',
                },
              },
            ] as CompletionItem[]
            if (isAnnotationSpec(a[key]) && a[key].config.arguments?.length) {
              const aName = `@${[...prev, key].join('.')}`
              const documentation = {
                kind: 'markdown',
                value: a[key].renderDoc(aName) || '',
              } as MarkupContent
              options[0].documentation = documentation
              options[0].kind = CompletionItemKind.Keyword
              options[0].command = undefined
              options[0].insertText = undefined
              options.push({
                label: key,
                labelDetails: {
                  detail: ` (snippet)`,
                },
                kind: CompletionItemKind.Snippet,
                insertText: `${key} ${a[key].argumentsSnippet}`,
                insertTextFormat: 2,
                documentation: {
                  kind: 'markdown',
                  value: `## Snippet\n\n${documentation.value}`,
                },
                command: {
                  command: 'editor.action.triggerParameterHints',
                  title: 'Trigger Signature Help',
                },
              })
            }
            return options
          })
        }
      }

      // declared (imported) types or exported from other documents
      const before = charBefore(text, offset, [/[\s\w]/u])
      if (block?.blockType === 'structure' && before && [':', '|', '&'].includes(before)) {
        return this.getDeclarationsCompletions(itnDoc, text)
      }
      if (block?.blockType === undefined && before && ['=', '|', '&'].includes(before)) {
        return this.getDeclarationsCompletions(itnDoc, text)
      }

      // autocomplete for defined nodes
      if (token?.parentNode && isRef(token.parentNode)) {
        const id = token.parentNode.token('identifier')
        if (!id) {
          return undefined
        }
        const chain =
          token.text === '.' ? token.parentNode.chain : token.parentNode.chain.slice(0, -1)
        const unwound = itnDoc.unwindType(id.text, chain)
        if (unwound?.def) {
          let options: SemanticNode[] | undefined
          if (isInterface(unwound.def) || isStructure(unwound.def)) {
            options = Array.from(unwound.def.props.values())
          } else if (isProp(unwound.def) && unwound.def.nestedProps) {
            options = Array.from(unwound.def.nestedProps.values())
          }
          return options?.map(t => ({
            label: t.id,
            kind: CompletionItemKind.Property,
          })) as CompletionItem[]
        }
      }
    })

    connection.onSignatureHelp(async params => {
      const { textDocument, position } = params
      const document = documents.get(textDocument.uri)
      if (!document) {
        return
      }
      const aContext = await this.getAnnotationContextAt(document, position)
      if (!aContext) {
        return
      }

      const { currentIndex, annotationSpec, annotationToken } = aContext
      if (!annotationSpec) {
        return
      }

      const args = annotationSpec.config.arguments || []

      // eslint-disable-next-line sonarjs/no-nested-template-literals
      const label = `${annotationToken.text} ${args
        .map(a => `${a.name}${a.optional ? '?' : ''}: ${a.type}`)
        .join(', ')}`
      const descr = annotationSpec.config.description
      // Define signature information
      const signature = SignatureInformation.create(`${label}`, descr)

      // Define parameter-specific information
      signature.parameters = args.map(a =>
        ParameterInformation.create(
          `${a.name}${a.optional ? '?' : ''}: ${a.type}`,
          `${a.description}`
        )
      )

      return {
        signatures: [signature],
        activeSignature: 0,
        activeParameter: currentIndex,
      }
    })

    connection.onHover(async params => {
      const { textDocument, position } = params
      const document = documents.get(textDocument.uri)
      if (!document) {
        return
      }
      const aContext = await this.getAnnotationContextAt(document, position)
      if (!aContext) {
        return
      }
      const { annotationSpec, itnDoc, annotationToken } = aContext
      if (!annotationSpec) {
        return
      }
      const token = itnDoc.tokensIndex.at(position.line, position.character)
      if (!token) {
        return
      }
      if (token === annotationToken) {
        return {
          contents: {
            kind: 'markdown',
            value: annotationSpec.renderDoc(token.text),
          },
          range: token.range,
        } as Hover
      }
      if (
        typeof token.index === 'number' &&
        annotationSpec.config.arguments?.length &&
        annotationSpec.config.arguments.length > token.index
      ) {
        return {
          contents: {
            kind: 'markdown',
            value: annotationSpec.renderDoc(token.index),
          },
          range: token.range,
        } as Hover
      }
    })

    // connection.languages.semanticTokens.onRange(async params =>
    //   this.provideSemanticTokens(params.textDocument.uri, params.range)
    // )
  }

  // async provideSemanticTokens(uri: string, range?: Range) {
  //   const document = this.documents.get(uri)
  //   if (!document) {
  //     return { data: [] } as SemanticTokens
  //   }

  //   const itnDoc = await this.openDocument(document.uri)
  //   if (!itnDoc || itnDoc.resolvedAnnotations.length === 0) {
  //     return { data: [] } as SemanticTokens
  //   }
  //   // await this.currentCheck

  //   const builder = new SemanticTokensBuilder()
  //   itnDoc.resolvedAnnotations.sort((a, b) => a.range.start.line - b.range.start.line)
  //   itnDoc.resolvedAnnotations.forEach(token => {
  //     if (
  //       range &&
  //       range.start.line <= token.range.start.line &&
  //       range.end.line >= token.range.end.line
  //     ) {
  //       builder.push(token.range.start.line, token.range.start.character, token.text.length, 0, 1)
  //     }
  //   })

  //   return builder.build()
  // }

  async getAnnotationContextAt(document: TextDocument, position: Position) {
    const text = document.getText()
    const offset = document.offsetAt(position)

    // Get the text from the start of the line up to the cursor
    const lineStartOffset = text.lastIndexOf('\n', offset - 1) + 1
    const lineText = text.slice(lineStartOffset, offset)

    // Check if the line starts with an annotation (e.g., @label)
    const annotationMatch = /^\s*@([.0-9A-Za-z]*)/u.exec(lineText)
    if (!annotationMatch) {
      return
    }
    // await this.currentCheck
    const itnDoc = await this.openDocument(document.uri)
    const annotationToken = itnDoc.tokensIndex.at(position.line, lineText.indexOf('@') + 1)
    if (!annotationToken?.parentNode) {
      return
    }
    let argToken = itnDoc.tokensIndex.at(position.line, position.character)
    const currentAnnotation = annotationToken.parentNode.annotations?.get(annotationMatch[1])
    if (!argToken && currentAnnotation) {
      for (let i = currentAnnotation.args.length - 1; i >= 0; i--) {
        const argI = currentAnnotation.args[i]
        if (argI.range.end.character < position.character) {
          argToken = currentAnnotation.args[i + 1]
          break
        }
      }
    }
    const annotationSpec = itnDoc.resolveAnnotation(annotationToken.text.slice(1))
    return {
      itnDoc,
      annotationToken,
      argToken,
      currentIndex: argToken?.index ?? (currentAnnotation?.args.length || 0),
      annotationSpec,
    }
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, max-params
  async getDeclarationsCompletions(
    itnDoc: ItnDocument,
    text: string
  ): Promise<CompletionItem[] | undefined> {
    const defs = Array.from(itnDoc.registry.definitions.entries())
    const items = [] as CompletionItem[]
    const exporters = new Map<string, ItnDocument>()
    const importSet = new Set<string>()
    for (const [key, token] of defs) {
      let t = token
      if (token.fromPath) {
        let exporter = exporters.get(token.fromPath)
        if (!exporter) {
          exporter = await this.openDocument(resolveItnFromPath(token.fromPath, itnDoc.id))
          exporters.set(token.fromPath, exporter)
        }
        t = exporter.registry.definitions.get(token.text)!
        importSet.add(token.text)
      }
      items.push({
        label: key,
        kind:
          t.parentNode?.entity === 'interface'
            ? CompletionItemKind.Interface
            : CompletionItemKind.TypeParameter,
        detail: token.fromPath ? `imported from '${token.fromPath}'` : undefined,
      })
    }
    for (const docPromise of this.itn.values()) {
      const doc = await docPromise
      if (doc !== itnDoc) {
        for (const node of doc.exports.values()) {
          const token = node.token('identifier')
          if (token && !importSet.has(token.text)) {
            const fromPath = getRelPath(itnDoc.id, doc.id)
            const importEdit = addImport(text, token.text, fromPath)
            items.push({
              label: token.text,
              kind:
                node.entity === 'interface'
                  ? CompletionItemKind.Interface
                  : CompletionItemKind.TypeParameter,
              detail: `add import from '${fromPath}'`,
              labelDetails: {
                description: `${fromPath}`,
              },
              additionalTextEdits: [importEdit],
            })
          }
        }
      }
    }
    const keys = itnDoc.primitives.map(p => p.id)
    items.push(
      ...keys.map(k => ({
        label: k,
        kind: CompletionItemKind.Keyword,
        detail: `primitive "${k}"`,
      }))
    )
    return items
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this, max-params
  async getImportBlockCompletions(
    itnDoc: ItnDocument,
    block: Token,
    text: string,
    offset: number,
    triggerKind?: 1 | 2 | 3
  ): Promise<CompletionItem[] | undefined> {
    const rule = createInsertTextRule(text, offset, triggerKind ?? 1)
    const target = await this.openDocument(resolveItnFromPath(block.fromPath!, itnDoc.id))
    if (target) {
      const imports = itnDoc.imports.get(target.id)?.imports || []
      const importsSet = new Set(imports.map(i => i.text))
      return Array.from(target.exports.values())
        .filter(n => !importsSet.has(n.id!) && rule.test(n.id!))
        .map(node => ({
          label: node.id,
          kind:
            node.entity === 'interface'
              ? CompletionItemKind.Interface
              : CompletionItemKind.TypeParameter,
          labelDetails: { description: `${node.id} [${node.entity}]` },
          insertText: rule.apply(node.id!),
        })) as CompletionItem[]
    }
  }

  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getImportPathCompletions(
    itnDoc: ItnDocument,
    token: Token,
    position: Position
  ): Promise<CompletionItem[] | undefined> {
    const dif = position.character - token.range.start.character - 1
    const paths = await getItnFileCompletions(itnDoc.id, token.fromPath!.slice(0, dif))
    return paths.map(({ path, isDirectory }) => ({
      label: path,
      kind: isDirectory ? CompletionItemKind.Folder : CompletionItemKind.File,
      command: isDirectory
        ? {
            command: 'editor.action.triggerSuggest',
            title: 'Trigger Suggest',
          }
        : undefined,
      textEdit: {
        replace: {
          start: {
            line: token.range.start.line,
            character: token.range.start.character + 1,
          },
          end: { line: token.range.end.line, character: token.range.end.character - 1 },
        },
        range: {
          start: {
            line: token.range.start.line,
            character: token.range.start.character + 1,
          },
          end: { line: token.range.end.line, character: token.range.end.character - 1 },
        },
        newText: isDirectory ? `${path}/` : path,
      },
    })) as CompletionItem[]
  }

  async triggerChecks() {
    if (this.idle) {
      this.currentCheck = this.runChecks()
    }
    return this.currentCheck
  }

  async runChecks() {
    if (this.idle && (this.changeQueue.length > 0 || this.revalidateQueue.length > 0)) {
      this.idle = false
      await new Promise(resolve => setTimeout(resolve, this.checksDelay))
      const ids = [] as string[]
      while (this.changeQueue.length > 0 || this.revalidateQueue.length > 0) {
        const isFromChangeQueue = this.changeQueue.length > 0
        const id = isFromChangeQueue ? this.changeQueue.shift()! : this.revalidateQueue.shift()!
        ids.push(id)
        this.pendingCheck.delete(id)
        const doc = await this.openDocument(id)
        if (this.changedSet.has(id) && this.itn.has(id)) {
          const text = this.documents.get(id)?.getText()
          if (typeof text === 'string') {
            doc.update(text)
          }
        }
        const changed = this.changedSet.has(id)
        this.changedSet.delete(id)
        await this.checkDoc(doc, changed)
        if (this.changeQueue.length > 0 || this.revalidateQueue.length > 0) {
          await new Promise(resolve => setTimeout(resolve, this.checksDelay))
        }
      }
      this.idle = true
    }
  }

  addToChangeQueue(id: string) {
    this.changedSet.add(id)
    if (this.pendingCheck.has(id)) {
      return
    }
    this.pendingCheck.add(id)
    this.changeQueue.push(id)
    this.triggerChecks()
  }

  addToRevalidateQueue(id: string) {
    if (this.pendingCheck.has(id)) {
      return
    }
    this.pendingCheck.add(id)
    this.revalidateQueue.push(id)
    this.triggerChecks()
  }

  protected async _openDocument(id: string, text?: string): Promise<ItnDocument> {
    const td = this.documents.get(id)
    if (td) {
      const { compiled } = await this.resolveConfig(id)
      const itnDoc = new ItnDocument(id, compiled)
      itnDoc.update(td.getText())
      return itnDoc
    }
    return super._openDocument(id, text)
  }

  revalidateDependants(itnDoc: ItnDocument) {
    itnDoc.dependants.forEach(d => {
      d.clearMessages()
      this.addToRevalidateQueue(d.id)
    })
  }

  async checkDoc(itnDoc: ItnDocument, changed = false) {
    await this.checkImports(itnDoc)
    const unused = itnDoc.getUnusedTokens()
    const messages = itnDoc.getDiagMessages()
    this.connection.sendDiagnostics({
      uri: itnDoc.id,
      diagnostics: messages.concat(
        ...unused.map(t => ({
          severity: DiagnosticSeverity.Hint,
          range: t.range,
          message: `Unused token: ${t.text}`,
          tags: [DiagnosticTag.Unnecessary],
        }))
      ),
    })
    if (changed) {
      this.revalidateDependants(itnDoc)
    }
  }
}
