import { createHttpLink, InMemoryCache } from '@apollo/client/core'
import type { ApolloClientOptions } from '@apollo/client/core'
import { errorHandlerLink } from '../links/error-handler.link'
import { authLink } from '../links/auth.link'

export function getDefaultClientOptions(): ApolloClientOptions<unknown> {
  const httpLink = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

  const cache = new InMemoryCache()
  const link = authLink.concat(errorHandlerLink).concat(httpLink)

  return { link, cache }
}
