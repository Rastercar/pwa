import { useAuth } from 'src/state/auth.state';
import { route } from 'quasar/wrappers';
import { routes } from './routes';
import {
  createWebHashHistory,
  createMemoryHistory,
  createWebHistory,
  createRouter,
} from 'vue-router';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

const createAppRouter = route(() => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    history: createHistory(
      process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE
    ),
  });

  router.beforeEach((to, from, next) => {
    const { isLoggedIn } = useAuth();

    const { requiresLogin, requiresLogoff } = to.meta;

    if (requiresLogin && !isLoggedIn.value) return next('/login');
    if (requiresLogoff && isLoggedIn.value) return false;

    return next();
  });

  return router;
});

export default createAppRouter({});
