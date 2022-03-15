import { RouteRecordRaw } from 'vue-router'

export const trackedRoutes: RouteRecordRaw[] = [
  {
    path: '/cliente',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      {
        path: 'meu-perfil',
        name: 'meu-perfil',
        component: () => import('src/pages/tracked/my-profile/Index.vue'),
        meta: { requiresLogin: true },
      },
      {
        path: 'mapa',
        name: 'mapa',
        component: () => import('src/pages/tracked/map/Index.vue'),
        meta: { requiresLogin: true },
      },
      {
        path: 'veiculos',
        name: 'veiculos',
        component: () => import('src/pages/tracked/vehicles/Index.vue'),
        meta: { requiresLogin: true },
      },
      {
        path: 'veiculos/:id',
        name: 'veiculo',
        component: () => import('src/pages/tracked/vehicles/_id/Index.vue'),
        meta: { requiresLogin: true },
      },
    ],
  },
]

export default trackedRoutes
