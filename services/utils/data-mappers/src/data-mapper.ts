import { GraphQLClient } from 'graphql-request';
import { ObjectID } from 'mongodb';
import { getSdk, Sdk, SdkFunctionWrapper } from '../__generated__/types';

export default class DataMapper {

  graphQLClient: GraphQLClient
  sdk: Sdk
  
  constructor(endpoint: string, authToken: string) {
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `BEARER ${authToken}`
      }
    });

    this.sdk = getSdk(this.graphQLClient);
  }

  generateObjectId(): string {
    const objectId = new ObjectID();
    return objectId.toHexString();
  }
}