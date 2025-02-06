import 'zx/globals'
import { readFileSync, writeFileSync } from 'fs'
import { getWorkspacePath } from './utils.js'

$.verbose = true

async function run() {
  const pkgPath = getWorkspacePath(`packages/vscode/package.json`)
  const pkg = JSON.parse(readFileSync(pkgPath))
  pkg.name = 'anscript'
  pkg.dependencies['@ts-anscript/core'] = `^${pkg.version}`
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

  await $`cd ./packages/vscode && pnpm run publish`

  pkg.name = '@ts-anscript/vscode'
  pkg.dependencies['@ts-anscript/core'] = `workspace:^`
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
}

run()
