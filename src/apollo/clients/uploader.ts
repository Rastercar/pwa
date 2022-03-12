import { InMemoryCache, ApolloLink } from '@apollo/client/core'
import type { ApolloClientOptions } from '@apollo/client/core'
import { createUploadLink } from 'apollo-upload-client'
import { authLink } from '../links/auth.link'

export function getUploaderClientOptions(): ApolloClientOptions<unknown> {
  const cache = new InMemoryCache()

  const uploadLink = createUploadLink({
    uri: process.env.GRAPHQL_ENDPOINT,
  }) as unknown as ApolloLink

  const link = authLink.concat(uploadLink)

  return { link, cache }
}
