import type { App } from 'vue';

const globalMethodsArr = [
  {
    sign: '$log',
    res: (data: unknown) => console.log('🚀 :: data', data),
  },
];

export function setupMethods(app: App) {
  globalMethodsArr.forEach((item) => {
    app.config.globalProperties[item.sign] = item.res;
  });
}
