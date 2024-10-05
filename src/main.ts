import App from './App.vue'
import { registerPlugins } from './plugins'
import { loadEnvVariables } from './utils/env'

const bootstrap = () => {
  loadEnvVariables()

  const app = createApp(App)

  registerPlugins(app)

  app.mount('#app')
}

bootstrap()
