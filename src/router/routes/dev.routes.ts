import { RouteRecordRaw } from 'vue-router'

export const devRoutes: RouteRecordRaw[] = [
  {
    path: '/dev/test',
    component: () => import('src/layouts/client/ClientLayout.vue'),
    children: [
      {
        path: '',
        name: 'test',
        component: () => import('src/pages/dev/Index.vue'),
      },
    ],
  },
]
