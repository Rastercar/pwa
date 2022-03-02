import { RouteRecordRaw } from 'vue-router'

export const trackedRoutes: RouteRecordRaw[] = [
  {
    path: '/cliente',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/dev/TestPage.vue') },
    ],
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/cliente/meu-perfil',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      {
        path: '',
        component: () =>
          import('src/pages/tracked/profile/TrackedProfilePage.vue'),
      },
    ],
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/cliente/mapa-principal',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/tracked/main-map/MainMapPage.vue'),
      },
    ],
    meta: {
      requiresLogin: true,
    },
  },
  {
    path: '/cliente/veiculos',
    component: () => import('layouts/tracked/TrackedLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/tracked/vehicles/VehiclesPage.vue'),
      },
    ],
    meta: {
      requiresLogin: true,
    },
  },
]

export default trackedRoutes
