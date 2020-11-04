"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const data_mapper_1 = __importDefault(require("./data-mapper"));
const CREATE_ACCOUNT = graphql_request_1.gql `
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
const GET_ACCOUNT_BY_ID = graphql_request_1.gql `
  query GetAccountByAccountId($accountId: UUID!) {
    accountByAccountId(accountId: $accountId) {
      accountId
      email
      emailVerified
      group
      fullName
      firstName
    }
  }
`;
const GET_ACCOUNT_BY_EMAIL = graphql_request_1.gql `
  query GetAccountByEmail($email: String!) {
    accountByEmail(email: $email) {
      accountId
      email
    }
  }
`;
class AccountMapper extends data_mapper_1.default {
    constructor(endpoint, authToken) {
        super(endpoint, authToken);
    }
    async findOrCreateCognitoAccount(cognitoAccount) {
        const findResponse = await this.findCognitoAccount(cognitoAccount);
        if (findResponse)
            return findResponse;
        const createResponse = await this.createAccountFromCognito(cognitoAccount);
        return createResponse;
    }
    async findCognitoAccount(cognitoAccount) {
        const accountId = cognitoAccount.sub;
        const response = await this.graphQLClient
            .request(GET_ACCOUNT_BY_ID, { accountId });
        console.log('find account response', response);
        return response.accountByAccountId;
    }
    async createAccountFromCognito(cognitoAccount) {
        const account = {
            accountId: cognitoAccount.sub,
            email: cognitoAccount.email,
            emailVerified: cognitoAccount.emailVerified,
            group: cognitoAccount['cognito:groups'][0]
        };
        const response = await this.createAccount(account);
        return response;
    }
    async createAccount(account) {
        const accountInputVar = this.createAccountInput(account);
        const response = await this.graphQLClient
            .request(CREATE_ACCOUNT, accountInputVar);
        // console.log('create account response', response);
        return response.createAccount.account;
    }
    createAccountInput(account) {
        return {
            accountInput: {
                account: {
                    ...account
                }
            }
        };
    }
    async findAccountByEmail(email) {
        const accountRes = await this.graphQLClient.request(GET_ACCOUNT_BY_EMAIL, { email });
        return accountRes.accountByEmail;
    }
}
exports.default = AccountMapper;
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
//# sourceMappingURL=account-mapper.js.map