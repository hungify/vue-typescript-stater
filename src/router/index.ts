import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto/routes'
import { setupLayouts } from 'virtual:generated-layouts'
import type { App } from 'vue'
import { envVariables } from '#/utils/env'

export const setupRouter = (app: App) => {
  const router = createRouter({
    history: createWebHistory(envVariables.baseUrl),
    routes: setupLayouts(routes),
  })

  app.use(router)
}
