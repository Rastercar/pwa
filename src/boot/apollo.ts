import { getDefaultClientOptions } from 'src/apollo/clients/default'
import { provideApolloClient } from '@vue/apollo-composable'
import { ApolloClient } from '@apollo/client/core'
import { boot } from 'quasar/wrappers'
import { InjectionKey } from 'vue'

interface ApolloProviders {
  default: ApolloClient<unknown>
  uploader: ApolloClient<unknown>
}

export const ApolloProvidersKey: InjectionKey<ApolloProviders> =
  Symbol('ApolloProvidersKey')

export default boot(({ app, router }) => {
  const defaultClient = new ApolloClient(getDefaultClientOptions())
  defaultClient.onClearStore(() => router.push({ name: 'login' }))

  const clients = { default: defaultClient }

  provideApolloClient(clients.default)

  app.provide(ApolloProvidersKey, clients)
})
