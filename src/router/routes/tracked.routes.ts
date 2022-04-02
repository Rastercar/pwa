import { RouteRecordRaw } from 'vue-router'
import { mapParamsToProps } from './routes.utils'

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
          layout: { showHeader: 'never' },
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
        props: mapParamsToProps({ id: 'integer' }),
        meta: { auth: { requiresLogin: true } },
      },
    ],
  },
]

export default trackedRoutes
