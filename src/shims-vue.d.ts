/// <reference types="unplugin-auto-import/vite" />
/// <reference types="unplugin-vue-components/vite" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
/// <reference types="unplugin-icons/types/vue" />
/// <reference types="unplugin-vue-router/client" />
/// <reference types="vite/client" />

import '@total-typescript/ts-reset'

interface ImportMetaEnv {
  readonly BASE_URL: string
  readonly MODE: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly SSR: boolean

  // custom env variables
  readonly VITE_BASE_API: string
}


declare module 'vue-router' {
  export interface BaseRouteMeta {
    title?: string
    layout?: 'Default' | 'Blank'
    full?: boolean
    requiresAuth?: boolean
  }
  interface RouteMeta extends BaseRouteMeta {}
}

declare interface Window {}

export {}
