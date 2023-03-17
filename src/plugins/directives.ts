import type { App } from 'vue';

export function setupDirectives(app: App) {
  const directives = import.meta.glob<{ install: (app: App) => void }>('./directives/*.ts');
  Object.values(directives).forEach(async (directive) => {
    const { install } = await directive();
    install(app);
  });
}
