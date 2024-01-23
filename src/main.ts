import { type App } from 'vue'
import { setupRouter } from './router'
import { loadEnvVariables } from './utils/env'
import AppVue from './App.vue'
import '#/styles/main.css?global'

const bootstrap = () => {
  loadEnvVariables()
  const app = createApp(AppVue)

  const plugins = import.meta.glob<{ install: (app: App) => void }>(
    './plugins/*.ts',
  )

  for (const plugin in plugins) {
    if (Object.prototype.hasOwnProperty.call(plugins, plugin)) {
      plugins[plugin]().then((mod) => mod.install(app))
    }
  }
  setupRouter(app)
  app.mount('#app')
}

bootstrap()
