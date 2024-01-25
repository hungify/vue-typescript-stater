import { setupRouter } from './router'
import { loadEnvVariables } from './utils/env'
import AppVue from './App.vue'
import type { App } from 'vue'

const bootstrap = async () => {
  loadEnvVariables()
  const app = createApp(AppVue)

  const plugins = import.meta.glob<{ install: (app: App) => void }>(
    './plugins/*.ts',
  )

  for (const plugin of Object.values(plugins)) {
    const { install } = await plugin()
    install(app)
  }

  setupRouter(app)
  app.mount('#app')
}

bootstrap()
