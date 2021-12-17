import { errorRoutes } from './error.routes';
import { RouteRecordRaw } from 'vue-router';
import { authRoutes } from './auth.routes';
import { mainRoutes } from './main.routes';
import { devRoutes } from './dev.routes';

export const routes: RouteRecordRaw[] = [
  ...mainRoutes,
  ...authRoutes,
  ...errorRoutes,
  ...(process.env.NODE_ENV === 'production' ? [] : devRoutes),
];
