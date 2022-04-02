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

interface ParamTypeDescription {
  [k: string]: 'string' | 'integer' | 'number'
}

/**
 * Creates a fn that maps all the params to the route
 * component props and cast them to their respective type
 */
export const mapParamsToProps = (paramsToMap: ParamTypeDescription) => {
  return (route: RouteLocationNormalized) => {
    const props: Record<string, unknown> = {}

    const converters = {
      number: parseFloat,
      integer: parseInt,
      string: (v: unknown) => v,
    }

    Object.entries(paramsToMap).forEach(([paramName, paramType]) => {
      const rawParam = route.params[paramName]

      if (!rawParam || Array.isArray(rawParam)) return

      props[paramName] = converters[paramType](rawParam)
    })

    return props
  }
}
