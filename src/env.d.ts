declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined
    VUE_ROUTER_BASE: string | undefined
    /**
     * The api graphql endpoint, ex: mysite.com/graphql
     *
     * (Does not include the ending '/')
     */
    GRAPHQL_ENDPOINT: string
    /**
     * The api base url, ex: myapi.com
     *
     * (Does not include the ending '/')
     */
    API_BASE_URL: string
  }
}
