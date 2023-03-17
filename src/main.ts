import App from './App.vue';
import { setupAssets, setupDirectives, setupMixins, setupMethods, setupPinia } from './plugins';
import { setupRouter } from './router';

const app = createApp(App);

setupPinia(app);

setupMixins(app);

setupAssets(app);

setupMethods(app);

setupDirectives(app);

setupRouter(app);

app.mount('#app');
