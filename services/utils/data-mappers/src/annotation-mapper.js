"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const data_mapper_1 = __importDefault(require("./data-mapper"));
const MUTATION_CREATE_ANNOTATION = graphql_request_1.gql `
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
`;
const QUERY_ALL_ANNOTATIONS = graphql_request_1.gql `
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
const MUTATION_UPDATE_ANNOTATION_BY_HIGHLIGHT = graphql_request_1.gql `
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
class AnnotationMapper extends data_mapper_1.default {
    constructor(endpoint, authToken, accountId, publicationId) {
        super(endpoint, authToken);
        this.publicationId = publicationId;
        this.accountId = accountId;
    }
    async createAnnotation(annotation) {
        const annotationVars = this.createAnnotationInput(annotation);
        try {
            const annotationResponse = await this.graphQLClient.request(MUTATION_CREATE_ANNOTATION, annotationVars);
            console.log('create annotation response', annotationResponse);
            return annotationResponse.createAnnotation.annotation;
        }
        catch (error) {
            console.log('catching create annotation error for duplicates');
            const firstError = error.response.errors[0];
            if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_notes"') {
                return {
                    duplicateMessage: 'annotation with note text and location already exists',
                    duplicateAnnotation: annotation
                };
            }
            if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_highlights"') {
                return {
                    duplicateMessage: `annotation with highlight text and location already exists`,
                    duplicateAnnotation: annotation
                };
            }
            console.log('unexpected create annotation error message');
            console.log(error);
            throw error;
        }
    }
    stringifyLocation(annotation) {
        if ('noteLocation' in annotation)
            annotation.noteLocation = JSON.stringify(annotation.noteLocation);
        if ('highlightLocation' in annotation)
            annotation.highlightLocation = JSON.stringify(annotation.highlightLocation);
        return annotation;
    }
    createAnnotationInput(annotation) {
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
        };
    }
    async getAllAnnotationsFromPublication() {
        const allAnnotationsQueryVar = {
            annotationCondition: {
                publicationId: this.publicationId,
                accountId: this.accountId
            }
        };
        const allAnnotationsRes = await this.graphQLClient
            .request(QUERY_ALL_ANNOTATIONS, allAnnotationsQueryVar);
        return allAnnotationsRes.allAnnotations.nodes;
    }
    async updateAnnotationByHighlight(annotation) {
        const updateAnnotationByHighlightVar = this.createUpdateAnnotationByHiglightVar(annotation);
        const updateResponse = await this.graphQLClient
            .request(MUTATION_UPDATE_ANNOTATION_BY_HIGHLIGHT, updateAnnotationByHighlightVar);
        return updateResponse
            .updateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightText
            .annotation;
    }
    createUpdateAnnotationByHiglightVar(annotation) {
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
        };
    }
}
exports.default = AnnotationMapper;
//# sourceMappingURL=annotation-mapper.js.map