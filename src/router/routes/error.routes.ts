import { createUserTypeGuard } from '../guards/user-type-only.guard'
import { RouteRecordRaw } from 'vue-router'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    name: 'error-not-found',
    component: () => import('src/pages/error/not-found/Index.vue'),
  },
  {
    path: '/error/cliente-nao-especificado',
    name: 'error-cliente-nao-especificado',
    beforeEnter: createUserTypeGuard({ allowedType: 'MasterUserModel' }),
    component: () => import('src/pages/error/client-not-selected/Index.vue'),
  },
  {
    path: '/error/acesso-negado',
    name: 'error-acesso-negado',
    component: () => import('src/pages/error/forbidden/Index.vue'),
  },
]
