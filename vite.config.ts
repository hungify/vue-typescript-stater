import { fileURLToPath, URL } from 'node:url';
import AutoImport from 'unplugin-auto-import/vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {},
  },
  plugins: [
    AutoImport({
      imports: ['vue', 'vue-router'],
      dirs: [fileURLToPath(new URL('./src', import.meta.url))],
      dts: 'src/@types/vue/auto-imports.d.ts',
      vueTemplate: true,
    }),
    vue({
      include: [/\.vue$/],
    }),
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
