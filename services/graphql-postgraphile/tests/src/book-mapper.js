"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_request_1 = require("graphql-request");
const mongodb_1 = require("mongodb");
const CREATE_AUTHOR = graphql_request_1.gql `
  mutation CreateAuthor($authorInput: CreateAuthorInput!) {
    createAuthor(input: $authorInput) {
      __typename
      author {
        authorId
        name
      }
    } 
  }
`;
const CREATE_BOOK = graphql_request_1.gql `
  mutation CreatePublication($bookInput: CreatePublicationInput!) {
    createPublication(input: $bookInput) {
      __typename
      publication {
        createdAt
        id
        updatedAt
        publicationId
        bookByPublicationId {
          description
          id
          imageUrl
          isbn13
          languageCode
          publicationDate
          publicationId
          publisher
          title
          bookType
        }
      }
    }
  }
`;
class BookMapper {
    constructor(endpoint, authToken, accountId) {
        this.graphQLClient = new graphql_request_1.GraphQLClient(endpoint, {
            headers: {
                authorization: `BEARER ${authToken}`
            }
        });
        this.accountId = accountId;
    }
    generateObjectId() {
        const objectId = new mongodb_1.ObjectID();
        return objectId.toHexString();
    }
    async findOrCreateBook(book) {
    }
    async createBook(book) {
        const bookMutationVars = this.createBookInput(book);
        try {
            const bookResponse = await this.graphQLClient.request(CREATE_BOOK, bookMutationVars);
            console.log(bookResponse);
        }
        catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
        // create authors if successful
        const authors = book.authors;
        const bookPublicationId = this.getBookPublicationId(bookMutationVars);
        const authorResponses = await Promise.all(authors.map((author) => {
            const authorMutationVars = this.createAuthorInput(author, bookPublicationId);
            return this.graphQLClient.request(CREATE_AUTHOR, authorMutationVars);
        }));
        console.log(authorResponses);
    }
    createBookInput(book) {
        const publicationId = this.generateObjectId();
        // authors willl be added in separate mutation
        const bookNoAuthors = Object.assign({}, book);
        delete bookNoAuthors.authors;
        return {
            bookInput: {
                publication: {
                    publicationId,
                    bookUsingPublicationId: {
                        create: [
                            {
                                ...bookNoAuthors
                            }
                        ]
                    },
                    accountPublicationsUsingPublicationId: {
                        create: [
                            {
                                accountId: this.accountId
                            }
                        ]
                    }
                }
            }
        };
    }
    getBookPublicationId(input) {
        return input.bookInput.publication.publicationId;
    }
    async createAuthor(name, publicationId) {
        const mutationVar = this.createAuthorInput(name, publicationId);
        const res = await this.graphQLClient.request(CREATE_AUTHOR, mutationVar);
        return res;
    }
    createAuthorInput(name, publicationId) {
        const authorId = this.generateObjectId();
        return {
            authorInput: {
                author: {
                    authorId,
                    name,
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
exports.default = BookMapper;
//# sourceMappingURL=book-mapper.js.map