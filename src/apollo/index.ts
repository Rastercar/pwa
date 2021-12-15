/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import type { ApolloClientOptions } from '@apollo/client/core';
import type { BootFileParams } from '@quasar/app';

export function getClientOptions(options?: Partial<BootFileParams<unknown>>) {
  return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    {
      link: createHttpLink({
        uri: process.env.GRAPHQL_URI || 'http://localhost:3000/graphql',
      }),

      cache: new InMemoryCache(),
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa' ? {} : {},
    process.env.MODE === 'ssr' ? {} : {},
    process.env.MODE === 'pwa' ? {} : {},
    process.env.MODE === 'bex' ? {} : {},
    process.env.MODE === 'cordova' ? {} : {},
    process.env.MODE === 'capacitor' ? {} : {},
    process.env.MODE === 'electron' ? {} : {},

    // dev/prod options.
    process.env.DEV ? {} : {},
    process.env.PROD ? {} : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER ? { ssrMode: true } : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? { ssrForceFetchDelay: 100 }
      : {}
  );
}
