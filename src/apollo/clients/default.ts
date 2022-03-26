import { createHttpLink, InMemoryCache, split } from '@apollo/client/core'
import type { ApolloClientOptions } from '@apollo/client/core'
import { errorHandlerLink } from '../links/error-handler.link'
import { getMainDefinition } from '@apollo/client/utilities'
import { wsLink } from '../links/subscriptions.link'
import { authLink } from '../links/auth.link'

export function getDefaultClientOptions(): ApolloClientOptions<unknown> {
  const httpLink = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT })

  const cache = new InMemoryCache()

  const wsForSubscriptionsHttpForQueryAndMutationsLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink
  )

  const link = authLink
    .concat(errorHandlerLink)
    .concat(wsForSubscriptionsHttpForQueryAndMutationsLink)

  return {
    link,
    cache,
    // https://github.com/apollographql/apollo-client/pull/4499
    resolvers: {},
  }
}
