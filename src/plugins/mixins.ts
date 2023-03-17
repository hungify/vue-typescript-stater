import type { App } from 'vue';

export function setupMixins(app: App) {
  app.mixin({
    inheritAttrs: false,
  });
}
