/**
 |
 | Resolvers for the client defined queries, mutations and types
 |
 */

import { ApolloClientOptions } from '@apollo/client/core';
import { authResolvers } from '../graphql/auth/auth.resolvers';
import { merge } from 'lodash';

export const resolvers: ApolloClientOptions<unknown>['resolvers'] = merge(
  {},
  authResolvers
);
