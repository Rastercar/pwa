import { RouteRecordRaw } from 'vue-router';

export const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/dev/TestPage.vue') },
    ],
  },
];

export default mainRoutes;
