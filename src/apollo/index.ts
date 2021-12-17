import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import type { ApolloClientOptions } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { useAuth } from '../state/auth.state';

type apolloOptions = ApolloClientOptions<unknown>;
type partialOptions = Partial<apolloOptions>;

export function getClientOptions() {
  const httpLink = createHttpLink({ uri: process.env.GRAPHQL_ENDPOINT });

  /**
   * Tries to set the request as authenticated whenever
   */
  const authLink = setContext((_, previousContext) => {
    const { headers } = previousContext as { headers: Record<string, unknown> };
    const { state: authState } = useAuth();

    return authState.apiToken
      ? { ...headers, authorization: `Bearer ${authState.apiToken}` }
      : headers;
  });

  const cache = new InMemoryCache();

  const generalOptions: apolloOptions = {
    link: authLink.concat(httpLink),
    cache,
  };

  const ssrServerOptions: partialOptions = { ssrMode: true };
  const ssrClientOptions: partialOptions = { ssrForceFetchDelay: 100 };

  return Object.assign(
    generalOptions,

    process.env.MODE === 'spa' ? {} : {},
    process.env.MODE === 'ssr' ? {} : {},
    process.env.MODE === 'pwa' ? {} : {},
    process.env.MODE === 'bex' ? {} : {},
    process.env.MODE === 'cordova' ? {} : {},
    process.env.MODE === 'capacitor' ? {} : {},
    process.env.MODE === 'electron' ? {} : {},

    process.env.DEV ? {} : {},
    process.env.PROD ? {} : {},

    process.env.MODE === 'ssr' && process.env.SERVER ? ssrServerOptions : {},
    process.env.MODE === 'ssr' && process.env.CLIENT ? ssrClientOptions : {}
  ) as apolloOptions;
}
