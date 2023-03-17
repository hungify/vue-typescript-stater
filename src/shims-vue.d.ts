declare interface Window {
  // extend the window
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

//Typing for the env variables
interface ImportMetaEnv {
  readonly VITE_BASE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

//Typing for the route meta
declare module 'vue-router' {
  export interface BaseRouteMeta {
    title?: string;
    layout?: 'Default' | 'Blank';
    full?: boolean;
    requiresAuth?: boolean;
  }
  interface RouteMeta extends BaseRouteMeta {}
}

//Typing for the properties of the app
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $log: typeof console.log;
  }
}

export {};
