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
        meta: { auth: { requiresLogin: true } },
      },
      {
        path: 'mapa',
        name: 'mapa',
        component: () => import('src/pages/tracked/map/Index.vue'),
        meta: {
          layout: { hideHeader: true },
          auth: { requiresLogin: true },
        },
      },
      {
        path: 'veiculos',
        name: 'veiculos',
        component: () => import('src/pages/tracked/vehicles/Index.vue'),
        meta: { auth: { requiresLogin: true } },
      },
      {
        path: 'veiculos/:id',
        name: 'veiculo',
        component: () => import('src/pages/tracked/vehicles/_id/Index.vue'),
        meta: { auth: { requiresLogin: true } },
      },
    ],
  },
]

export default trackedRoutes
