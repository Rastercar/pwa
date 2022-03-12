import { provideApolloClient } from '@vue/apollo-composable'
import { getUploaderClientOptions } from 'src/apollo/clients/uploader'
import { getDefaultClientOptions } from 'src/apollo/clients/default'
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
  defaultClient.onClearStore(() => router.push('/login'))

  const clients = {
    default: defaultClient,
    uploader: new ApolloClient(getUploaderClientOptions()),
  }

  provideApolloClient(clients.default)

  app.provide(ApolloProvidersKey, clients)
})
