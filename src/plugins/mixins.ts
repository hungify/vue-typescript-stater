import type { App } from 'vue';

export const install = (app: App) => {
  app.mixin({
    inheritAttrs: false,
  });
};
