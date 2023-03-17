import App from './App.vue';
import { type App as AppVue } from 'vue';
import { setupRouter } from './router';

const bootstrap = async () => {
  const app = createApp(App);

  const plugins = import.meta.glob<{ install: (app: AppVue) => void }>('./plugins/*.ts');
  Object.values(plugins).forEach(async (plugin) => {
    const { install } = await plugin();
    install(app);
  });

  setupRouter(app);
  app.mount('#app');
};

bootstrap();
