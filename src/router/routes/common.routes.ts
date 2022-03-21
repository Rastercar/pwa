import { CurrentUserDocument } from 'src/graphql/generated/graphql-operations'
import { useApolloClient } from '@vue/apollo-composable'
import { useAuth } from 'src/state/auth.state'
import { RouteRecordRaw } from 'vue-router'

export const commonRoutes: RouteRecordRaw[] = [
  {
    // This route has no components as its a redirection route
    // we cannot use the `redirect` prop here as we calculate the
    // need for redirection on a async fn and `redirect` is sync
    path: '/',
    beforeEnter: async () => {
      const { isLoggedIn, AUTH_LOGOUT } = useAuth()

      if (!isLoggedIn.value) return 'login'

      const { data: currentUser } = await useApolloClient()
        .resolveClient()
        .query({ query: CurrentUserDocument })

      // If we are logged in (we have a JWT in the local storage) but we failed to fetch
      // the current user then something is very wrong, so we just reset the application
      if (!currentUser) {
        AUTH_LOGOUT()
        return '/login'
      }

      return currentUser.me.__typename === 'MasterUserModel'
        ? '/rastreadora'
        : '/cliente'
    },
    components: {},
  },
]

export default commonRoutes
