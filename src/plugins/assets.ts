import type { App } from 'vue'
import '#/styles/main.css?global'
import '#/scripts/iconify/dist/iconify-bundle.js'

export const install = (app: App) => {
  app.mixin({
    inheritAttrs: false,
  })
}
