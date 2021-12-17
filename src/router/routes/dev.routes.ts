import { RouteRecordRaw } from 'vue-router';

export const devRoutes: RouteRecordRaw[] = [
  {
    path: '/dev/test',
    component: () => import('layouts/main/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/TestPage.vue') }],
  },
];
