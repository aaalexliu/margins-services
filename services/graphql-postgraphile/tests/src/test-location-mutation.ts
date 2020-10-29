import { GraphQLClient, gql }  from 'graphql-request';
import * as dotenv from 'dotenv';
dotenv.config();

import {
  CreateAnnotationInput
} from '../../__generated__/types'

async function main() {
  const endpoint = 'http://ec2-34-232-69-157.compute-1.amazonaws.com:8080/graphql';

  const graphQLClient = new GraphQLClient(endpoint, {
    headers: {
      authorization: `BEARER ${process.env.GRAPHQL_JWT}`,
    },
  })

  const mutation = gql`
    mutation MyMutation($inputAnnotation: CreateAnnotationInput!) {
      __typename
      createAnnotation(input: $inputAnnotation) {
        annotation {
          annotationId
          location
          noteType
          text
        }
      }
    }
  `;

  const variables: {inputAnnotation: CreateAnnotationInput} = {
    inputAnnotation: {
      annotation: {
        annotationId: '5f7ff26c5adb04e595916ed0',
        publicationId: '5f7e785c5adb04e595916e9e',
        text: "test-location4",
        noteType: "HIGHLIGHT",
        location: JSON.stringify({kindleLocation: 1, chapter: 'chapter'}),
        accountId: "46d3f3d1-879b-4314-9301-ae470c5a2062"
      }
    }
  }
  const data = await graphQLClient.request(mutation, variables);
      // MutationCreateAnnotationArgs, {inputAnnotation: CreateAnnotationInput}

  console.log(JSON.stringify(data, undefined, 2))
}

main().catch((error) => console.error(error))

