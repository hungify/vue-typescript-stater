import { createApp } from 'vue';
import { setupRouter } from '~/router';
import { createPinia } from 'pinia';
import App from './App.vue';
import { setupAssets, setupDirectives, setupGlobalMethods } from './plugins';

async function bootstrap() {
  const app = createApp(App);

  app.use(createPinia());

  app.mixin({
    inheritAttrs: false,
  });

  setupAssets(app);

  setupGlobalMethods(app);

  setupDirectives(app);

  await setupRouter(app);

  app.mount('#app');
}

bootstrap();
