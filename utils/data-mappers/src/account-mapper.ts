import { gql } from 'graphql-request';

import {
  CreateAccountMutationVariables,
  AccountInput,
} from '../__generated__/types';

import DataMapper from './data-mapper';

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
        updatedAt
        lastName
      }
    }
  }
`;

const GET_ACCOUNT_BY_ID = gql`
  query GetAccountByAccountId($accountId: UUID!) {
    accountByAccountId(accountId: $accountId) {
      accountId
      email
      emailVerified
      group
    }
  }
`;


const GET_ACCOUNT_BY_EMAIL = gql`
  query GetAccountByEmail($email: String!) {
    accountByEmail(email: $email) {
      accountId
      email
    }
  }
`;

// omit 'id' from imported Account type, since it's generated
// server side to adhere to the relay specification
// so in a sense it's a local account instead of global 
// OK NVM works in theory but many to many plugin adds a ton of
// connectors that seem like a pain to strip, just manually
// define interface then...
// type LocalAccount = Omit<Account, "id">;

interface CognitoAccount {
  sub: string,
  email: string,
  emailVerified: boolean,
  'cognito:groups': string[]
}

export default class AccountMapper extends DataMapper{

  constructor(endpoint: string, authToken: string) {
    super(endpoint, authToken);
  }

  async findOrCreateCognitoAccount(cognitoAccount: CognitoAccount) {
    const findResponse = await this.findCognitoAccount(cognitoAccount);
    if (findResponse) return findResponse;
    
    const createResponse = await this.createAccountFromCognito(cognitoAccount);
    return createResponse;
  }

  async findCognitoAccount(cognitoAccount: CognitoAccount) {
    const accountId = cognitoAccount.sub;
    const response = await this.sdk.GetAccountByAccountId({accountId});
    console.log('find account response', response);
    return response.accountByAccountId;
  }

  async createAccountFromCognito(cognitoAccount: CognitoAccount) {
    const account = {
      accountId: cognitoAccount.sub,
      email: cognitoAccount.email,
      emailVerified: cognitoAccount.emailVerified,
      group: cognitoAccount['cognito:groups'][0]
    }
    const response = await this.createAccount(account);
    return response;
  }

  async createAccount(account: AccountInput) {
    const accountInputVar = this.createAccountInput(account);
    try {
      const response = await this.sdk.CreateAccount(accountInputVar);
      return {
        success: 'success',
        account: response.createAccount.account
      }
    } catch (error) {
      console.log('catching create account error');
      const firstError = error.response.errors[0];
      if (firstError.message === 'duplicate key value violates unique constraint "account_pkey"') {
        return {
          error: 'duplicate'
        }
      }
      console.log('unexpected error', firstError);
      return {
        error
      }
    }
  }

  createAccountInput(account: AccountInput): CreateAccountMutationVariables {
    return {
      accountInput: {
        account: {
          ...account
        }
      }
    }
  }

  async findAccountByEmail(email: string) {
    const accountRes = await this.sdk.GetAccountByEmail({email})
    return accountRes.accountByEmail;
  }
}

//sample id token from cognito
// {
//   "sub": "46d3f3d1-879b-4314-9301-ae470c5a2062",
//   "cognito:groups": [
//     "margins_account"
//   ],
//   "email_verified": true,
//   "iss": "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_jcGG3tVBb",
//   "cognito:username": "46d3f3d1-879b-4314-9301-ae470c5a2062",
//   "cognito:roles": [
//     "arn:aws:iam::516851544810:role/amplify-marginsmereact-dev-205104-authRole"
//   ],
//   "aud": "4v1q302r040fct1ve3kkhoo30b",
//   "event_id": "d207a8f6-f162-426c-acf8-890644f8b58e",
//   "token_use": "id",
//   "auth_time": 1604060976,
//   "exp": 1604147376,
//   "iat": 1604060976,
//   "email": "uilxela7@gmail.com"
// }