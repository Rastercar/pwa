import { getCurrentUser, mapParamsToProps } from '../routes.utils'
import { useAuth } from 'src/state/auth.state'
import { RouteRecordRaw } from 'vue-router'

/**
 * Routes for a rastercar client, those routes show content specific to a
 * client/organization, and should be only acessible by users or
 *
 * - route path has '/cliente' prefix
 * - route name has 'cliente' prefix
 */
export const clientRoutes: RouteRecordRaw[] = [
  {
    path: '/cliente',
    name: 'cliente',
    redirect: '/cliente/mapa',
  },
  {
    path: '/cliente',
    component: () => import('src/layouts/client/ClientLayout.vue'),
    beforeEnter: async () => {
      const { state: authState } = useAuth()

      const user = await getCurrentUser()

      const isMasterUserAcessingClientRouteWithNoSelectedClient =
        user?.__typename === 'MasterUserModel' && !authState.organizationId

      if (isMasterUserAcessingClientRouteWithNoSelectedClient) {
        return '/error/cliente-nao-especificado'
      }
    },
    children: [
      {
        path: 'meu-perfil',
        name: 'cliente-meu-perfil',
        component: () => import('src/pages/client/my-profile/Index.vue'),
        meta: { auth: { requiresLogin: true } },
      },
      {
        path: 'mapa',
        name: 'cliente-mapa',
        component: () => import('src/pages/client/map/Index.vue'),
        meta: {
          layout: { showHeader: 'never' },
          auth: { requiresLogin: true },
        },
      },
      {
        path: 'veiculos',
        name: 'cliente-veiculos',
        component: () => import('src/pages/client/vehicles/Index.vue'),
        meta: { auth: { requiresLogin: true } },
      },
      {
        path: 'veiculos/:id',
        name: 'cliente-veiculo',
        component: () => import('src/pages/client/vehicles/_id/Index.vue'),
        props: mapParamsToProps({ id: 'integer' }),
        meta: { auth: { requiresLogin: true } },
      },
    ],
  },
]

export default clientRoutes
