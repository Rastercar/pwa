import { RouteLocationNormalized } from 'vue-router'

/**
 * Creates a fn that maps all the queries to the route component props
 */
export const mapQueryToProps = (queryValuesToMap: string[]) => {
  return (route: RouteLocationNormalized) => {
    const props: Record<string, unknown> = {}

    queryValuesToMap.forEach((queryValue) => {
      props[queryValue] = route.query[queryValue]
    })

    return props
  }
}
