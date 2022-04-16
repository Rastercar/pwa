import { RouteRecordRaw } from 'vue-router'
import { mapQueryToProps } from '../routes.utils'

export const authRoutes: RouteRecordRaw[] = [
  // Unfortunately since the root path '/' is a componentless
  // and redirectionless path we cant use it as the auth routes
  // parent to apply the centralized layout
  {
    path: '/login',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('src/pages/auth/login/Index.vue'),
      },
    ],
    meta: { auth: { requiresLogoff: true } },
  },
  {
    path: '/auto-login',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/auto-login/Index.vue'),
        props: mapQueryToProps(['token']),
      },
    ],
    meta: { auth: { requiresLogoff: true } },
  },
  {
    path: '/confirmar-email',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/confirm-email/Index.vue'),
        props: mapQueryToProps(['token']),
      },
    ],
  },
  {
    path: '/redefinir-senha',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/redefine-password/Index.vue'),
        props: mapQueryToProps(['token']),
      },
    ],
  },
  {
    path: '/esqueceu-senha',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        name: 'esqueceu-senha',
        component: () => import('src/pages/auth/forgot-password/Index.vue'),
        props: mapQueryToProps(['token']),
      },
    ],
  },
  {
    path: '/registrar',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        name: 'registrar',
        component: () => import('src/pages/auth/register/Index.vue'),
      },
    ],
    meta: { auth: { requiresLogoff: true } },
  },
  {
    path: '/oauth',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: 'link-sucesso',
        component: () =>
          import('src/pages/common/oauth-link-success/Index.vue'),
      },
    ],
  },
]
