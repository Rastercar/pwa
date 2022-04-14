import { clientRoutes } from './client.routes'
import { errorRoutes } from './error.routes'
import { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth.routes'
import commonRoutes from './common.routes'
import masterRoutes from './master.routes'
import { devRoutes } from './dev.routes'

export const routes: RouteRecordRaw[] = [
  ...(process.env.NODE_ENV === 'production' ? [] : devRoutes),
  ...clientRoutes,
  ...masterRoutes,
  ...authRoutes,
  ...errorRoutes,
  ...commonRoutes,
]
