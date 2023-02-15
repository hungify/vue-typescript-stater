import type { ModuleNamespace } from 'vite/types/hot';
import type { App } from 'vue';

export const setupLayouts = (app: App) => {
  const layouts = import.meta.glob<boolean, string, ModuleNamespace>('./*.vue');
  Object.entries(layouts).forEach(([fileName, path]) => {
    const name = fileName.replace(/^\.\/(.*)\.\w+$/, '$1');
    app.component(
      name,
      defineAsyncComponent(() => path()),
    );
  });
};
