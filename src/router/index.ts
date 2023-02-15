import type { App } from 'vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Home from '~/pages/home.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      layout: 'Default',
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('~/pages/about.vue'),
    meta: {
      layout: 'Default',
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export const setupRouter = async (app: App) => {
  app.use(router);
  await router.isReady();
};

export default router;
