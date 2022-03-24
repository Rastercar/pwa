import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    auth?: {
      /**
       * If the route should be accessible only by logged in users
       */
      requiresLogin?: boolean
      /**
       * If the route should be accessible only by non logged in users
       */
      requiresLogoff?: boolean
    }
    layout?: {
      /**
       * The condition to show the layout header
       * (**NOTE:** This means the route page should implement a way to trigger sidebad navigation and so on)
       */
      showHeader: 'never' | 'always' | 'mobile-only' | 'desktop-only'
    }
  }
}
