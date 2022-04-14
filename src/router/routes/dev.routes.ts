import { RouteRecordRaw } from 'vue-router'

export const devRoutes: RouteRecordRaw[] = [
  {
    path: '/dev/test',
    component: () => import('layouts/client/TrackedLayout.vue'),
    children: [
      {
        path: '',
        name: 'test',
        component: () => import('src/pages/dev/Index.vue'),
      },
    ],
  },
]
