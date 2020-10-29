"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
async function main() {
    const endpoint = 'http://ec2-34-232-69-157.compute-1.amazonaws.com:8080/graphql';
    const graphQLClient = new graphql_request_1.GraphQLClient(endpoint, {
        headers: {
            authorization: `BEARER ${process.env.GRAPHQL_JWT}`,
        },
    });
    const mutation = graphql_request_1.gql `
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
    const variables = {
        inputAnnotation: {
            annotation: {
                annotationId: '5f7ff26c5adb04e595916ed0',
                publicationId: '5f7e785c5adb04e595916e9e',
                text: "test-location4",
                noteType: "HIGHLIGHT",
                location: JSON.stringify({ kindleLocation: 1, chapter: 'chapter' }),
                accountId: "46d3f3d1-879b-4314-9301-ae470c5a2062"
            }
        }
    };
    const data = await graphQLClient.request(mutation, variables);
    // MutationCreateAnnotationArgs, {inputAnnotation: CreateAnnotationInput}
    console.log(JSON.stringify(data, undefined, 2));
}
main().catch((error) => console.error(error));
//# sourceMappingURL=test-location-mutation.js.map