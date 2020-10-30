import { GraphQLClient, gql } from 'graphql-request';

import {
  CreateAccountInput
} from '../../__generated__/types';

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($accountInput: CreateAccountInput!) {
    createAccount(input: $accountInput) {
      __typename
      account {
        accountId
        email
        createdAt
        emailVerified
        firstName
        fullName
        updatedAt
        lastName
      }
    }
  }
`;

interface AccountInputVar {
  accountInput: CreateAccountInput
}

interface Account {
  accountId: string,
  email: string,
  emailVerified: boolean,
  fullName: string
}

export default class AccountMapper {
  graphQLClient: GraphQLClient;

  constructor(endpoint: string, authToken: string) {
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `BEARER ${authToken}`
      }
    });
  }

  async createAccount(account: Account) {
    const accountInputVar = this.createAccountInput(account);
    const response = await this.graphQLClient.request(CREATE_ACCOUNT, accountInputVar);
    console.log(response);
  }

  createAccountInput(account: Account): AccountInputVar {
    return {
      accountInput: {
        account: {
          ...account
        }
      }
    }
  }
}