import { useAuth } from 'src/state/auth.state'
import { route } from 'quasar/wrappers'
import { LoadingBar } from 'quasar'
import { routes } from './routes'

import {
  createWebHashHistory,
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from 'vue-router'

const createAppRouter = route(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  })

  router.beforeEach((to, from, next) => {
    const { isLoggedIn } = useAuth()

    const { requiresLogin, requiresLogoff } = to.meta

    if (requiresLogin && !isLoggedIn.value) return next('/login')
    if (requiresLogoff && isLoggedIn.value) return false

    return next()
  })

  router.beforeResolve(() => {
    LoadingBar.start()
  })

  router.afterEach(() => {
    LoadingBar.stop()
  })

  return router
})

export default createAppRouter({})
