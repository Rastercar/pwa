import { Resolvers } from './generated/graphql-operations';

export const xd: Resolvers = {
  Mutation: {
    login: () => {
      return {
        token: { type: 'bearer', value: 'xdd' },
        user: { id: '1', email: '', emailVerified: false, username: '' },
      };
    },
  },
};
