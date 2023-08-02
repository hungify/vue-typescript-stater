/// <reference types="vite/client" />
/// <reference types="unplugin-auto-import/vite" />
/// <reference types="unplugin-vue-components/vite" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />

declare interface Window {
  // extend the window
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

//Typing for the route meta
declare module 'vue-router' {
  export interface BaseRouteMeta {
    title?: string
    layout?: 'Default' | 'Blank'
    full?: boolean
    requiresAuth?: boolean
  }
  interface RouteMeta extends BaseRouteMeta {}
}

export {}
