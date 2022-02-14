import { ApolloClients, provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient } from '@apollo/client/core'
import { getClientOptions } from 'src/apollo'
import { boot } from 'quasar/wrappers'

export default boot(({ app, router }) => {
  const apolloClient = new ApolloClient(getClientOptions())
  apolloClient.onClearStore(() => router.push('/login'))

  const clients: Record<string, ApolloClient<unknown>> = {
    default: apolloClient,
  }

  provideApolloClient(clients.default)

  app.provide(ApolloClients, clients)
})
