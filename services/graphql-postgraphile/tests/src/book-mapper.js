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
        fullName
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
          bookTitle
          bookType
        }
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
        let publicationId;
        let bookResponse = await this.findBookByTitle(book);
        if (!bookResponse) {
            bookResponse = await this.createBook(book);
        }
        // find or create authors if successful
        const authors = book.authors;
        publicationId = bookResponse.publicationId;
        // const bookPublicationId = this.getBookPublicationId(bookMutationVars);
        const authorResponses = await Promise
            .all(authors.map((author) => this.findOrCreateAuthor(author, publicationId)));
        console.log('author responses', authorResponses);
    }
    async findBookByTitle(book) {
        const title = book.title;
        const GetPublicationVar = this.createGetPublicationVar(title);
        const response = await this.graphQLClient.request(GET_PUBLICATION, GetPublicationVar);
        console.log('get publication response', response);
        return response.publicationByAccountIdAndTitle;
    }
    createGetPublicationVar(title) {
        return {
            title,
            accountId: this.accountId
        };
    }
    async createBook(book) {
        const bookMutationVars = this.createBookInput(book);
        try {
            const bookResponse = await this.graphQLClient.request(CREATE_BOOK, bookMutationVars);
            console.log('create book response', bookResponse);
            return bookResponse.createPublication.publication;
        }
        catch (error) {
            console.error(JSON.stringify(error, null, 2));
        }
    }
    createBookInput(book) {
        const publicationId = this.generateObjectId();
        // authors willl be added in separate mutation
        // right now no need for all the book specific info - don't have it anyway in most cases
        // in the future will make sure to fully populate book with info from google books api
        // that way all the info will be valid and hopefully not conflict
        const bookNoAuthors = Object.assign({}, book);
        delete bookNoAuthors.authors;
        return {
            bookInput: {
                publication: {
                    publicationId,
                    accountId: this.accountId,
                    title: book.title,
                }
            }
        };
    }
    // getBookPublicationId(input: BookInputVar): string {
    //   return input.bookInput.publication.publicationId;
    // }
    async findOrCreateAuthor(fullName, publicationId) {
        let author = await this.findAuthor(fullName);
        if (author) {
            const connectAuthorResponse = await this.connectAuthorAndPublication(author.authorId, publicationId);
            if (connectAuthorResponse)
                return author;
            else
                return `error in linking existing author ${author}`;
        }
        author = await this.createAuthor(fullName, publicationId);
        return author;
    }
    async connectAuthorAndPublication(authorId, publicationId) {
        const connectAuthorPublicationVar = this.createPublicationAuthorInput(authorId, publicationId);
        try {
            const response = await this.graphQLClient.request(CONNECT_AUTHOR, connectAuthorPublicationVar);
            console.log('connectAuthorAndPublication response', response);
            return response;
        }
        catch (error) {
            console.log('catching..');
            console.log(error.response);
            const errors = error.response.errors;
            if (errors[0].message === `duplicate key value violates unique constraint "publication_author_pkey"`) {
                return `relation between author: ${authorId} and publication ${publicationId} already exists`;
            }
            throw error;
        }
    }
    createPublicationAuthorInput(authorId, publicationId) {
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
        const getAuthorVar = { fullName };
        const authorResponse = await this.graphQLClient.request(GET_AUTHOR, getAuthorVar);
        console.log('find author response', authorResponse);
        return authorResponse.authorByFullName;
    }
    async createAuthor(fullName, publicationId) {
        const createAuthorVar = this.createAuthorInput(fullName, publicationId);
        const authorResponse = await this.graphQLClient.request(CREATE_AUTHOR, createAuthorVar);
        console.log('create author response', authorResponse);
        return authorResponse.createAuthor.author;
    }
    createAuthorInput(fullName, publicationId) {
        const authorId = this.generateObjectId();
        return {
            authorInput: {
                author: {
                    authorId,
                    fullName,
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