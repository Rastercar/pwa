import { ApolloClients } from '@vue/apollo-composable';
import { ApolloClient } from '@apollo/client/core';
import { getClientOptions } from 'src/apollo';
import { boot } from 'quasar/wrappers';

export default boot(({ app }) => {
  const apolloClient = new ApolloClient(getClientOptions());

  const clients: Record<string, ApolloClient<unknown>> = {
    default: apolloClient,
  };

  app.provide(ApolloClients, clients);
});
