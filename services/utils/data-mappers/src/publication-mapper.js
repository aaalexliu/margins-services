"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const data_mapper_1 = __importDefault(require("./data-mapper"));
const CREATE_AUTHOR = graphql_request_1.gql `
  mutation CreateAuthor($authorInput: CreateAuthorInput!) {
    createAuthor(input: $authorInput) {
      __typename
      author {
        authorId
        fullName
      }
    } 
  }
`;
const CREATE_PUBLICATION = graphql_request_1.gql `
  mutation CreatePublication($publicationInput: CreatePublicationInput!) {
    createPublication(input: $publicationInput) {
      __typename
    publication {
        createdAt
        id
        updatedAt
        publicationId
        title
        accountId
      }
    }
  }
`;
const GET_PUBLICATION = graphql_request_1.gql `
  query GetPublicationByAccountAndTitle($accountId: UUID!, $title: String!) {
    __typename
    publicationByAccountIdAndTitle(accountId: $accountId, title: $title) {
      publicationId
      title
      accountId
      additionalMeta
    }
  }
`;
const GET_AUTHOR = graphql_request_1.gql `
  query GetAuthorByFullName($fullName: String!) {
    __typename
    authorByFullName(fullName: $fullName) {
      authorId
      fullName
    }
  }
`;
const CONNECT_AUTHOR = graphql_request_1.gql `
  mutation ConnectAuthorToPublication($authorAndPublication: CreatePublicationAuthorInput!) {
    __typename
    createPublicationAuthor(input: $authorAndPublication) {
      publicationAuthor {
        authorId
        publicationId
      }
    }
  }
`;
// interface PublicationResponse {
//   publicationId: string,
//   title?: string
// }
class PublicationMapper extends data_mapper_1.default {
    constructor(endpoint, authToken, accountId) {
        super(endpoint, authToken);
        this.accountId = accountId;
    }
    async findOrCreatePublication(publication) {
        let publicationId;
        let publicationResponse = await this.findPublicationByTitle(publication);
        if (!publicationResponse) {
            publicationResponse = await this.createPublication(publication);
        }
        // find or create authors if successful
        const authors = publication.authors;
        publicationId = publicationResponse.publicationId;
        // const bookPublicationId = this.getBookPublicationId(publicationMutationVar);
        const authorResponses = await Promise
            .all(authors.map((author) => this.findOrCreateAuthor(author, publicationId)));
        console.log('author responses', authorResponses);
        return {
            publicationId,
            authorIds: authorResponses.map(author => author.authorId)
        };
    }
    async findPublicationByTitle(publication) {
        const title = publication.title;
        const GetPublicationVar = this.createGetPublicationVar(title);
        const response = await this.sdk.GetPublicationByAccountAndTitle(GetPublicationVar);
        console.log('get publication response', response);
        return response.publicationByAccountIdAndTitle;
    }
    createGetPublicationVar(title) {
        return {
            title,
            accountId: this.accountId
        };
    }
    async createPublication(publication) {
        const publicationMutationVar = this.createPublicationMutationVars(publication);
        try {
            const publicationResponse = await this.sdk.CreatePublication(publicationMutationVar);
            console.log('create publication response', publicationResponse);
            return publicationResponse.createPublication.publication;
        }
        catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
    }
    createPublicationMutationVars(publication) {
        const publicationId = this.generateObjectId();
        // authors willl be added in separate mutation
        // right now no need for all the publication specific info - don't have it anyway in most cases
        // in the future will make sure to fully populate publication with info from google books api
        // that way all the info will be valid and hopefully not conflict
        const publicationNoAuthors = Object.assign({}, publication);
        delete publicationNoAuthors.authors;
        return {
            publicationInput: {
                publication: {
                    publicationId,
                    accountId: this.accountId,
                    title: publication.title,
                }
            }
        };
    }
    // getBookPublicationId(input: PublicationInputVar): string {
    //   return input.bookInput.publication.publicationId;
    // }
    async findOrCreateAuthor(fullName, publicationId) {
        let author = await this.findAuthor(fullName);
        if (author) {
            const connectAuthorResponse = await this.connectAuthorAndPublication(author.authorId, publicationId);
            console.log(connectAuthorResponse);
            return author;
        }
        author = await this.createAuthor(fullName, publicationId);
        return author;
    }
    async connectAuthorAndPublication(authorId, publicationId) {
        const connectAuthorPublicationVar = this.createAuthorPublicationVariables(authorId, publicationId);
        try {
            const response = await this.sdk.ConnectAuthorToPublication(connectAuthorPublicationVar);
            console.log('connectAuthorAndPublication response', response);
            return response;
        }
        catch (error) {
            // console.log('catching...');
            // console.log(error.response)
            const errors = error.response.errors;
            if (errors[0].message === `duplicate key value violates unique constraint "publication_author_pkey"`) {
                return `relation between author: ${authorId} and publication ${publicationId} already exists`;
            }
            throw error;
        }
    }
    createAuthorPublicationVariables(authorId, publicationId) {
        return {
            authorAndPublication: {
                publicationAuthor: {
                    authorId,
                    publicationId
                }
            }
        };
    }
    async findAuthor(fullName) {
        const authorResponse = await this.sdk.GetAuthorByFullName({ fullName });
        console.log('find author response', authorResponse);
        return authorResponse.authorByFullName;
    }
    async createAuthor(fullName, publicationId) {
        const createAuthorVar = this.createAuthorVariables(fullName, publicationId);
        const authorResponse = await this.sdk.CreateAuthor(createAuthorVar);
        console.log('create author response', authorResponse);
        return authorResponse.createAuthor.author;
    }
    createAuthorVariables(fullName, publicationId) {
        const authorId = this.generateObjectId();
        return {
            authorInput: {
                author: {
                    authorId,
                    fullName,
                    accountId: this.accountId,
                    publicationAuthorsUsingAuthorId: {
                        create: [{
                                publicationId
                            }]
                    }
                }
            }
        };
    }
}
exports.default = PublicationMapper;
//# sourceMappingURL=publication-mapper.js.map