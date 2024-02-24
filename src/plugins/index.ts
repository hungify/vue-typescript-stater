import type { App } from 'vue'
import { setupRouter } from '#/router'

export async function registerPlugins(app: App) {
  setupRouter(app)

  const imports = import.meta.glob<{ install: (app: App) => void }>([
    './*.ts',
    './**/index.ts',
  ])

  const importPaths = Object.keys(imports).sort()

  for (const path of importPaths) {
    const plugin = await imports[path]()
    plugin.install(app)
  }
}
