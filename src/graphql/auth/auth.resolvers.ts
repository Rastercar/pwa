import { Resolvers } from '../generated/graphql-operations';

export const authResolvers: Resolvers = {
  Mutation: {
    logout: () => {
      console.log('xd');
    },
  },
};
