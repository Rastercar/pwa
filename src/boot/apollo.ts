import { getUploaderClientOptions } from 'src/apollo/clients/uploader'
import { provideApolloClient } from '@vue/apollo-composable'
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
  defaultClient.onClearStore(() => router.push({ name: 'login' }))

  const uploaderClient = new ApolloClient(getUploaderClientOptions())

  const clients = { default: defaultClient, uploader: uploaderClient }

  provideApolloClient(clients.default)

  app.provide(ApolloProvidersKey, clients)
})
