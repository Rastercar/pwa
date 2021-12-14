import { gql } from '@apollo/client/core';

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      token {
        value
        type
      }
      user {
        id
        email
        username
      }
    }
  }
`;
