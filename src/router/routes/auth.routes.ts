import { RouteRecordRaw } from 'vue-router';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/login/LoginPage.vue'),
      },
    ],
    meta: {
      requiresLogoff: true,
    },
  },
  {
    path: '/auto-login',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/auto-login/AutoLoginPage.vue'),
        props: (route) => ({ token: route.query.token }),
      },
    ],
    meta: {
      requiresLogoff: true,
    },
  },
  {
    path: '/register',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/register/RegistrationPage.vue'),
      },
    ],
    meta: {
      requiresLogoff: true,
    },
  },
];
