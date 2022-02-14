import { trackedRoutes } from './tracked.routes'
import { errorRoutes } from './error.routes'
import { RouteRecordRaw } from 'vue-router'
import { authRoutes } from './auth.routes'
import commonRoutes from './common.routes'
import { devRoutes } from './dev.routes'

export const routes: RouteRecordRaw[] = [
  ...trackedRoutes,
  ...authRoutes,
  ...errorRoutes,
  ...commonRoutes,
  ...(process.env.NODE_ENV === 'production' ? [] : devRoutes),
]
