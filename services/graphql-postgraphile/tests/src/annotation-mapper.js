"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const mongodb_1 = require("mongodb");
const CREATE_ANNOTATION_MUTATION = graphql_request_1.gql `
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
class AnnotationMapper {
    constructor(endpoint, authToken, publicationId, accountId) {
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
    }
    createAnnotationInput(annotation) {
        const annotationId = (new mongodb_1.ObjectID()).toHexString();
        return {
            inputAnnotation: {
                annotation: {
                    ...annotation,
                    location: JSON.stringify(annotation.location),
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
//# sourceMappingURL=annotation-mapper.js.map