import { RouteRecordRaw } from 'vue-router'

export const devRoutes: RouteRecordRaw[] = [
  {
    name: 'test',
    path: '/dev/test',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/dev/TestPage.vue') },
    ],
  },
]
