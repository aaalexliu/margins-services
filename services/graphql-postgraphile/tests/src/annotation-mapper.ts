import { GraphQLClient, gql }  from 'graphql-request';
import { ObjectID } from 'mongodb';

import {
  AnnotationInput,
  CreateAccountInput,
  CreateAnnotationInput
} from '../../__generated__/types';

const MUTATION_CREATE_ANNOTATION = gql`
  mutation CreateAnnotation($inputAnnotation: CreateAnnotationInput!) {
    __typename
    createAnnotation(input: $inputAnnotation) {
      annotation {
        annotationId
        highlightLocation
        highlightText
        noteLocation
        noteText
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

  generateObjectId(): string {
    const objectId = new ObjectID();
    return objectId.toHexString();
  }

  async createAnnotation(annotation: Annotation) {
    const annotationVars: AnnotationMutationVars = this.createAnnotationInput(annotation);
    try {
      const annotationResponse = await this.graphQLClient.request(MUTATION_CREATE_ANNOTATION, annotationVars);
      console.log('create annotation response', annotationResponse);
      return annotationResponse.createAnnotation.annotation;
    } catch(error) {
      console.log('catching create annotation error for duplicates');
      const firstError = error.response.errors[0];
      if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_notes"') {
        return {
          duplicateMessage:  'annotation with note text and location already exists',
          duplicateAnnotation: annotation
        }
      }
      if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_highlights"') {
        return {
          duplicateMessage: `annotation with highlight text and location already exists`,
          duplicateAnnotation: annotation
        }
      }
      console.log('unexpected create annotation error message');
      console.log(error);
      throw error;
    }
  }

  createAnnotationInput(annotation: Annotation): AnnotationMutationVars {
    const annotationId = this.generateObjectId();
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

  // need to implement update annotation method when highlight is the same but note is different
  
}