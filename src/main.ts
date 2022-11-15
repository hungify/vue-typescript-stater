import { createApp } from 'vue';
import App from './App.vue';
import router from '~/router';

import '~/styles/main.css';

const app = createApp(App);

app.config.globalProperties.$log = console.log;
app.mixin({
  inheritAttrs: false,
});
app.use(router);

app.mount('#app');
