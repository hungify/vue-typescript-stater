import generatedRoutes from '~pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter } from 'vue-router';
import { createWebHistory } from 'vue-router';
import type { App } from 'vue';

export const setupRouter = (app: App) => {
  const routes = setupLayouts(generatedRoutes);

  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
  });

  app.use(router);
};
