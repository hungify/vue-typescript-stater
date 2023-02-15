export interface BaseRouteMeta {
  title?: string;
  layout?: 'Default' | 'Blank';
  full?: boolean;
  requiresAuth?: boolean;
}

declare module 'vue-router' {
  interface RouteMeta extends BaseRouteMeta {}
}
