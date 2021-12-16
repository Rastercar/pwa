import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * If the route should be accessible only by logged in users
     */
    requiresLogin?: boolean;
    /**
     * If the route should be accessible only by non logged in users
     */
    requiresLogoff?: boolean;
  }
}
