import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { setupLayouts } from './layouts';
import { setupAssets, setupDirectives, setupGlobalMethods } from './plugins';
import { setupRouter } from './router';

async function bootstrap() {
  const app = createApp(App);

  app.use(createPinia());

  app.mixin({
    inheritAttrs: false,
  });

  setupAssets(app);

  setupGlobalMethods(app);

  setupDirectives(app);

  setupLayouts(app);

  await setupRouter(app);

  app.mount('#app');
}

bootstrap();
