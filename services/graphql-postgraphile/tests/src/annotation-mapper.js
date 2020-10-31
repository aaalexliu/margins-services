"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const mongodb_1 = require("mongodb");
const CREATE_ANNOTATION_MUTATION = graphql_request_1.gql `
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
`;
class AnnotationMapper {
    constructor(endpoint, authToken, accountId, publicationId) {
        this.graphQLClient = new graphql_request_1.GraphQLClient(endpoint, {
            headers: {
                authorization: `BEARER ${authToken}`
            }
        });
        this.publicationId = publicationId;
        this.accountId = accountId;
    }
    async createAnnotation(annotation) {
        const annotationVars = this.createAnnotationInput(annotation);
        const response = this.executeCreateAnnotation(annotationVars);
        console.log(JSON.stringify(response, null, 2));
    }
    createAnnotationInput(annotation) {
        const annotationId = (new mongodb_1.ObjectID()).toHexString();
        if ('noteLocation' in annotation)
            annotation.noteLocation = JSON.stringify(annotation.noteLocation);
        if ('highlightLocation' in annotation)
            annotation.highlightLocation = JSON.stringify(annotation.highlightLocation);
        return {
            inputAnnotation: {
                annotation: {
                    ...annotation,
                    annotationId,
                    publicationId: this.publicationId,
                    accountId: this.accountId
                }
            }
        };
    }
    async executeCreateAnnotation(variables) {
        try {
            const data = await this.graphQLClient.request(CREATE_ANNOTATION_MUTATION, variables);
            return data;
        }
        catch (error) {
            console.error(JSON.stringify(error, undefined, 2));
        }
    }
}
exports.default = AnnotationMapper;
//# sourceMappingURL=annotation-mapper.js.map