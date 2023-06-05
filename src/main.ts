import { type App } from 'vue';
import { setupRouter } from './router';
import { loadEnvVariables } from './utils/env';
import AppVue from './App.vue';

const bootstrap = () => {
  loadEnvVariables();
  const app = createApp(AppVue);

  const plugins = import.meta.glob<{ install: (app: App) => void }>('./plugins/*.ts');
  Object.values(plugins).forEach(async (plugin) => {
    const { install } = await plugin();
    install(app);
  });

  setupRouter(app);
  app.mount('#app');
};

bootstrap();
