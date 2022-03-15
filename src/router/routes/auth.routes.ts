import { RouteRecordRaw } from 'vue-router'
import { mapQueryToProps } from './routes.utils'

export const authRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
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
        component: () => import('src/pages/auth/AutoLoginPage.vue'),
        props: mapQueryToProps(['token']),
      },
    ],
    meta: {
      requiresLogoff: true,
    },
  },
  {
    path: '/confirmar-email',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/auth/ConfirmEmailPage.vue'),
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
        component: () =>
          import('src/pages/auth/redefine-password/RedefinePasswordPage.vue'),
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
        component: () => import('src/pages/auth/ForgotPasswordPage.vue'),
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
        component: () => import('src/pages/auth/register/RegistrationPage.vue'),
      },
    ],
    meta: {
      requiresLogoff: true,
    },
  },
  {
    path: '/oauth/link-sucesso',
    component: () => import('layouts/centralized/CentralizedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/common/OauthLinkSuccesPage.vue'),
      },
    ],
  },
]
