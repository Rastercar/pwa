import { CurrentUserQueryDocument } from 'src/graphql/generated/graphql-operations'
import { useApolloClient } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { RouteRecordRaw } from 'vue-router'

export const commonRoutes: RouteRecordRaw[] = [
  {
    // This route
    path: '/',
    beforeEnter: async () => {
      const { isLoggedIn, AUTH_LOGOUT } = useAuth()

      if (!isLoggedIn.value) return 'login'

      const result = await useApolloClient().resolveClient().query({
        query: CurrentUserQueryDocument,
      })

      if (!result) {
        AUTH_LOGOUT()
        return '/login'
      }

      return result.data.me.__typename === 'MasterUserModel'
        ? '/tracker'
        : '/tracked'
    },
    components: {},
  },
]

export default commonRoutes
