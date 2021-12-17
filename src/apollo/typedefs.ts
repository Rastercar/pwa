/**
 |
 | Typedefs is a collection of the local schema
 | types, mutations, queries, etc, that augment
 | the server defined schema.
 |
 */

import { ApolloClientOptions } from '@apollo/client/core';
import authLocalSchema from '../graphql/auth/auth.local-schema.gql';

export const typeDefs: ApolloClientOptions<unknown>['typeDefs'] = [
  authLocalSchema,
];
