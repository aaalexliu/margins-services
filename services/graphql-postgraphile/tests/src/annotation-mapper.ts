import { GraphQLClient, gql }  from 'graphql-request';
import { ObjectID } from 'mongodb';

import {
  AnnotationInput,
  CreateAccountInput,
  CreateAnnotationInput
} from '../../__generated__/types';

const CREATE_ANNOTATION_MUTATION = gql`
  mutation CreateAnnotation($inputAnnotation: CreateAnnotationInput!) {
    __typename
    createAnnotation(input: $inputAnnotation) {
      annotation {
        annotationId
        location
        noteType
        higlightText
      }
    }
  }
`

interface Highlight {
  highlightText: string,
  color: string,
  highlightLocation: any
}

interface Note {
  noteText: string,
  noteLocation: any
}

type Annotation = Highlight | Note;

interface AnnotationMutationVars {
  inputAnnotation: CreateAnnotationInput
}

export default class AnnotationMapper {
  graphQLClient: GraphQLClient;
  publicationId: string;
  accountId: string;

  constructor(endpoint: string, authToken: string, accountId: string, publicationId: string) {
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `BEARER ${authToken}`
      }
    })
    this.publicationId = publicationId;
    this.accountId = accountId;
  }

  async createAnnotation(annotation: Annotation) {
    const annotationVars: AnnotationMutationVars = this.createAnnotationInput(annotation);
    const response = this.executeCreateAnnotation(annotationVars);
    console.log(JSON.stringify(response, null, 2));
  }

  createAnnotationInput(annotation: Annotation): AnnotationMutationVars {
    const annotationId = (new ObjectID()).toHexString();
    if ('noteLocation' in annotation) annotation.noteLocation = JSON.stringify(annotation.noteLocation);
    if ('highlightLocation' in annotation) annotation.highlightLocation = JSON.stringify(annotation.highlightLocation);

    return {
      inputAnnotation: {
        annotation: {
          ...annotation,
          annotationId,
          publicationId: this.publicationId,
          accountId: this.accountId
        }
      }
    }
  }

  async executeCreateAnnotation(variables: AnnotationMutationVars) {
    try {
      const data = await this.graphQLClient.request(CREATE_ANNOTATION_MUTATION, variables)
      return data;
    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2))
    }
  }

}