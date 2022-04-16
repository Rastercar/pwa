import { getCurrentUser } from '../routes.utils'
import { useAuth } from 'src/state/auth.state'
import { RouteRecordRaw } from 'vue-router'

export const commonRoutes: RouteRecordRaw[] = [
  {
    // This route has no components as its a redirection route
    // we cannot use the `redirect` prop here as we calculate the
    // need for redirection on a async fn and `redirect` is sync
    path: '/',
    beforeEnter: async () => {
      const { isLoggedIn, LOGOUT } = useAuth()

      if (!isLoggedIn.value) return 'login'

      const user = await getCurrentUser()

      // If we are logged in (we have a JWT in the local storage) but we failed to fetch
      // the current user then something is very wrong, so we just reset the application
      if (!user) {
        LOGOUT()
        return '/login'
      }

      return user.__typename === 'MasterUserModel' ? '/rastreadora' : '/cliente'
    },
    components: {},
  },
]

export default commonRoutes
