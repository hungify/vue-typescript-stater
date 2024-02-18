import type { App } from 'vue'
import { setupRouter } from '#/router'

export async function registerPlugins(app: App) {
  setupRouter(app)

  const plugins = import.meta.glob<{ install: (app: App) => void }>('./*.ts')

  for (const plugin of Object.values(plugins)) {
    const { install } = await plugin()
    install(app)
  }
}
