import { RouteRecordRaw } from 'vue-router'

export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/error/not-found/Index.vue'),
  },
]
