/**
 * 🪄 This file was generated by Anscript
 * It is generated based on annotations used in this project
 * Do not edit this file!
 *
 * Use `npx asc -f dts` command to re-generate this file
 */
export {}

declare global {
  interface AnscriptMetadata {
    label: string
    labelOptional: string | true
    mul: (number)[]
    mulOptional: (number | true)[]
    obj: { prop1: string, prop2?: number, prop3?: boolean }
    "long.nested.name": string
    "long.nested.name2": string
    nested: boolean
    id: string
    "bool.flag": boolean
  }
  type AnscriptPrimitiveFlags = "never" | "string" | "email" | "phone" | "number" | "positive" | "negative" | "single" | "double" | "int" | "boolean" | "true" | "false" | "null" | "void" | "undefined"
}
