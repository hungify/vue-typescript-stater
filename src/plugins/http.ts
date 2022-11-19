import type { App } from 'vue';

export const setupHttp = (app: App) => {
  app.config.globalProperties.$http = {
    get(url: string) {
      return fetch(url).then((res) => res.json());
    },
  };
};
