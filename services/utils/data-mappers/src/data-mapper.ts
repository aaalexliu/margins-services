import { GraphQLClient } from 'graphql-request';
import { ObjectID } from 'mongodb';

export default class DataMapper {

  graphQLClient: GraphQLClient
  
  constructor(endpoint: string, authToken: string) {
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `BEARER ${authToken}`
      }
    });
  }

  generateObjectId(): string {
    const objectId = new ObjectID();
    return objectId.toHexString();
  }
}