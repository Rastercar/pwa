import { RouteRecordRaw } from 'vue-router'

/**
 * Routes fot the master dashboard, pages contain general actions/data
 * that are relative to multiple clients/organizations and should only
 * be acessible by master users.
 *
 * - route path has '/rastreadora' prefix
 * - route name has 'master' prefix
 */
export const masterRoutes: RouteRecordRaw[] = [
  {
    path: '/rastreadora',
    redirect: '/rastreadora/home',
  },
  {
    path: '/rastreadora',
    component: () => import('layouts/master/MasterLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'master-home',
        component: () => import('src/pages/master/Index.vue'),
        meta: { auth: { requiresLogin: true } },
      },
    ],
  },
]

export default masterRoutes
