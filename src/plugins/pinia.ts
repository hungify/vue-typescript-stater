import { createPinia } from 'pinia';
import type { App } from 'vue';

export const setupPinia = (app: App) => {
  app.use(createPinia());
};
