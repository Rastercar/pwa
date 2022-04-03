import type { ApolloClientOptions } from '@apollo/client/core'
import { errorHandlerLink } from '../links/error-handler.link'
import { getMainDefinition } from '@apollo/client/utilities'
import { InMemoryCache, split } from '@apollo/client/core'
import { wsLink } from '../links/subscriptions.link'
import { uploadLink } from '../links/upload.link'
import { authLink } from '../links/auth.link'

export function getDefaultClientOptions(): ApolloClientOptions<unknown> {
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
    uploadLink
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
