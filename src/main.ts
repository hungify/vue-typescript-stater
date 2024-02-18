import { loadEnvVariables } from './utils/env'
import App from './App.vue'
import { registerPlugins } from './plugins'

const bootstrap = () => {
  loadEnvVariables()

  const app = createApp(App)

  registerPlugins(app)

  app.mount('#app')
}

bootstrap()
