import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      { path: '', component: () => import('pages/auth/LoginPage.vue') },
    ],
    meta: {
      requiresLogoff: true,
    },
  },
];
