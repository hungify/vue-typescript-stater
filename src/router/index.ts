import setupLayouts from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { createRouter } from 'vue-router'
import { createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { envVariables } from '#/utils/env'

export const setupRouter = (app: App) => {
  const routes = setupLayouts(generatedRoutes)

  const router = createRouter({
    history: createWebHistory(envVariables.baseUrl),
    routes
  })

  app.use(router)
}
