import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import TsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath, URL } from 'node:url'

import Checker from 'vite-plugin-checker'

export default defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/]
    }),

    Pages({
      extensions: ['vue', 'md']
    }),

    Layouts({
      defaultLayout: 'Default'
    }),

    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true
    }),

    Components({
      extensions: ['vue'],
      include: [/\.vue$/, /\.vue\?vue/],
      dts: 'src/components.d.ts'
    }),

    TsconfigPaths(),

    Checker({
      typescript: true
    })
  ]
})
