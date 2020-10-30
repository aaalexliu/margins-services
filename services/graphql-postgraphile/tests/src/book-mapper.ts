import { GraphQLClient, gql }  from 'graphql-request';
import { ObjectID } from 'mongodb';

import {
  CreatePublicationInput,
  CreateAuthorInput,
  CreateBookInput
} from '../../__generated__/types';



const CREATE_AUTHOR = gql`
  mutation CreateAuthor($inputAuthor: CreateAuthorInput!) {
    createAuthor(input: $inputAuthor) {
      __typename
      author {
        authorId
        name
      }
    } 
  }
`;

const CREATE_BOOK = gql`
  mutation CreatePublication($inputBook: CreatePublicationInput!) {
    createPublication(input: $inputBook) {
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
          type
        }
      }
    }
  }
`;

interface AuthorInputVar {
  inputAuthor: CreateAuthorInput
}

interface BookInputVar {
  inputBook: CreatePublicationInput
}

interface Book {
  title: string,
  authors: [string],
  isbn13?: string,
  description?: string,
  publisher?: string,
}

class BookMapper {
  graphQLClient: GraphQLClient;
  accountId: string;

  constructor(endpoint: string, authToken: string, accountId: string) {
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `BEARER ${authToken}`
      }
    })
  }

  generateObjectId(): string {
    const objectId = new ObjectID();
    return objectId.toHexString();
  }

  async createBook(book: Book) {
    const bookMutationVars = this.createBookInput(book);
    const bookResponse = await this.graphQLClient.request(CREATE_BOOK, bookMutationVars);
    console.log(bookResponse);

    // create authors if successful
    const authors = book.authors;
    const bookPublicationId = this.getBookPublicationId(bookMutationVars);
    const authorResponses = Promise.all(authors.map((author) => {
        const authorMutationVars = this.createAuthorInput(author, bookPublicationId);
        return this.graphQLClient.request(CREATE_AUTHOR, authorMutationVars);
      })
    );
    console.log(authorResponses);
  }

  createBookInput(book: Book): BookInputVar {
    const publicationId = this.generateObjectId();
    // authors willl be added in separate mutation
    const bookNoAuthors = Object.assign({}, book);
    delete bookNoAuthors.authors;
    return {
      inputBook: {
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
    }
  }

  getBookPublicationId(input: BookInputVar): string {
    return input.inputBook.publication.publicationId;
  }

  async createAuthor(name: string, publicationId: string) {
    const mutationVar = this.createAuthorInput(name, publicationId);
    const res = await this.graphQLClient.request(CREATE_AUTHOR, mutationVar);
    return res;
  }

  createAuthorInput(name: string, publicationId: string): AuthorInputVar {
    const authorId = this.generateObjectId();
    return {
      inputAuthor: {
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
    }
  }
}