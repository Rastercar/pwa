import { RouteRecordRaw } from 'vue-router'

export const trackedRoutes: RouteRecordRaw[] = [
  {
    path: '/tracked',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/dev/TestPage.vue') },
    ],
    meta: {
      requiresLogin: true,
    },
  },
]

export default trackedRoutes
