import { createApp } from 'vue';
import App from './App.vue';
import router from '~/routes';

import '~/styles/main.css';

const app = createApp(App);

app.config.globalProperties.$log = console.log;
app.mixin({
  inheritAttrs: true,
});
app.use(router);

app.mount('#app');
