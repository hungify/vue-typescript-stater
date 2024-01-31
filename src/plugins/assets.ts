import type { App } from 'vue'
import '#/scripts/iconify/dist/iconify-bundle.js'
import '@unocss/reset/tailwind.css'
import '#/styles/main.css?global'
import 'virtual:uno.css'
export const install = (app: App) => {
  app.mixin({
    inheritAttrs: false,
  })
}
