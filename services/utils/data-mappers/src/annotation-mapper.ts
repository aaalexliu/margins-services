import { GraphQLClient, gql }  from 'graphql-request';

import {
  AnnotationInput,
  CreateAnnotationInput,
  UpdateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightTextInput
} from '../__generated__/types';

import DataMapper from './data-mapper';

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

interface AnnotationMutationVars {
  inputAnnotation: CreateAnnotationInput
}

const QUERY_ALL_ANNOTATIONS = gql`
  query AllAnnotationByPublication($annotationCondition: AnnotationCondition!) {
    __typename
    allAnnotations(condition: $annotationCondition) {
      nodes {
        annotationId
        highlightLocation
        highlightText
        color
        noteLocation
        noteText
      }
    }
  }
`;

interface AllAnnotationsQueryVar {
  annotationCondition: {
    publicationId: string,
    accountId: string
  }
}

const MUTATION_UPDATE_ANNOTATION_BY_HIGHLIGHT = gql`
  mutation MyMutation($updateAnnotationByNote: UpdateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightTextInput!) {
    __typename
    updateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightText(input: $updateAnnotationByNote) {
      annotation {
        annotationId
        highlightLocation
        highlightText
        color
        noteLocation
        noteText
      }
    }
  }
`;

interface UpdateAnnotationsByHiglightVar {
  updateAnnotationByNote: UpdateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightTextInput
}

interface Highlight {
  highlightText: string,
  color: string,
  highlightLocation: any
}

interface Note {
  noteText: string,
  noteLocation: any
}

type Annotation = Highlight & Note;

export default class AnnotationMapper extends DataMapper{
  publicationId: string;
  accountId: string;

  constructor(endpoint: string, authToken: string, accountId: string, publicationId: string) {
    super(endpoint, authToken);
    this.publicationId = publicationId;
    this.accountId = accountId;
  }

  async createAnnotation(annotation: Annotation) {
    const annotationVars: AnnotationMutationVars = this.createAnnotationInput(annotation);
    try {
      const annotationResponse = await this.graphQLClient.request(MUTATION_CREATE_ANNOTATION, annotationVars);
      // console.log('create annotation response', annotationResponse);
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

  stringifyLocation(annotation: Annotation) {
    if ('noteLocation' in annotation) annotation.noteLocation = JSON.stringify(annotation.noteLocation);
    if ('highlightLocation' in annotation) annotation.highlightLocation = JSON.stringify(annotation.highlightLocation);
    return annotation;
  }

  createAnnotationInput(annotation: Annotation): AnnotationMutationVars {
    const annotationId = this.generateObjectId();
    const stringifedAnnotation = this.stringifyLocation(annotation);
    return {
      inputAnnotation: {
        annotation: {
          ...stringifedAnnotation,
          annotationId,
          publicationId: this.publicationId,
          accountId: this.accountId
        }
      }
    }
  }

  async getAllAnnotationsFromPublication() {
    const allAnnotationsQueryVar: AllAnnotationsQueryVar = {
      annotationCondition: {
        publicationId: this.publicationId,
        accountId: this.accountId
      }
    };
    const allAnnotationsRes = await this.graphQLClient
      .request(QUERY_ALL_ANNOTATIONS, allAnnotationsQueryVar);
    
    return allAnnotationsRes.allAnnotations.nodes
  }

  async updateAnnotationByHighlight(annotation: Annotation) {
    const updateAnnotationByHighlightVar = this.createUpdateAnnotationByHiglightVar(annotation);
    const updateResponse = await this.graphQLClient
      .request(MUTATION_UPDATE_ANNOTATION_BY_HIGHLIGHT, updateAnnotationByHighlightVar);
    return updateResponse
      .updateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightText
      .annotation;
  }

  createUpdateAnnotationByHiglightVar(annotation: Annotation): UpdateAnnotationsByHiglightVar {
    const stringifedAnnotation = this.stringifyLocation(annotation);
    return {
      updateAnnotationByNote: {
        publicationId: this.publicationId,
        accountId: this.accountId,
        highlightText: stringifedAnnotation.highlightText,
        highlightLocation: stringifedAnnotation.highlightLocation,
        annotationPatch: {
          noteText: stringifedAnnotation.noteText,
          noteLocation: stringifedAnnotation.noteLocation,
        }
      }
    }
  }  
}

