import { GraphQLClient, gql }  from 'graphql-request';
import { ObjectID } from 'mongodb';

import {
  CreatePublicationInput,
  CreateAuthorInput,
} from '../../__generated__/types';



const CREATE_AUTHOR = gql`
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

const CREATE_BOOK = gql`
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

const GET_PUBLICATION = gql`
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

const GET_AUTHOR = gql`
  query GetAuthorByFullName($fullName: String!) {
    __typename
    authorByFullName(name: $fullName) {
      authorId
      name
    }
  }
`;

const CONNECT_AUTHOR = gql`
  mutation ConnectAuthorToPublication($authorAndPublication: CreatePublicationAuthorInput!) {
    __typename
    createPublicationAuthor(input: {publicationAuthor: $authorAndPublication) {
      publicationAuthor {
        authorId
        publicationId
      }
    }
  }
`;


interface GetPublicationVar {
  accountId: string,
  title: string
}

interface GetAuthorVar {
  fullName: string
}

interface AuthorInputVar {
  authorInput: CreateAuthorInput
}

interface BookInputVar {
  bookInput: CreatePublicationInput
}

interface Book {
  title: string,
  authors: [string],
  isbn13?: string,
  description?: string,
  publisher?: string,
}

interface BookResponse {
  publicationId: string,
  title?: string
}

export default class BookMapper {
  graphQLClient: GraphQLClient;
  accountId: string;

  constructor(endpoint: string, authToken: string, accountId: string) {
    this.graphQLClient = new GraphQLClient(endpoint, {
      headers: {
        authorization: `BEARER ${authToken}`
      }
    });
    this.accountId = accountId;
  }

  generateObjectId(): string {
    const objectId = new ObjectID();
    return objectId.toHexString();
  }

  async findOrCreateBook(book: Book): BookResponse {
    let publicationId;
    let bookResponse = await this.findBookByTitle(book);
    if (!bookResponse) {
      bookResponse = await this.createBook(book);
    }
    // find or create authors if successful

    const authors = book.authors;
    publicationId = bookResponse.publicationId;
    // const bookPublicationId = this.getBookPublicationId(bookMutationVars);
    const authorResponses = await Promise.all(authors.map((author) => {
        const authorMutationVars = this.createAuthorInput(author, bookPublicationId);
        return this.graphQLClient.request(CREATE_AUTHOR, authorMutationVars);
      })
    );
    console.log(authorResponses);
  }

  async findBookByTitle(book: Book): Promise<BookResponse> {
    const title = book.title;
    const GetPublicationVar = this.createGetPublicationVar(title);
    const response = await this.graphQLClient.request(GET_PUBLICATION, GetPublicationVar);
    console.log('get publication response', response);
    return response.data.publication;
  }

  createGetPublicationVar(title: string): GetPublicationVar {
    return {
      title,
      accountId: this.accountId
    }
  }

  async createBook(book: Book) {
    const bookMutationVars = this.createBookInput(book);
    try {
      const bookResponse = await this.graphQLClient.request(CREATE_BOOK, bookMutationVars);
      console.log('create book response', bookResponse);
      return bookResponse.publication;
    } catch(error) {
      console.error(JSON.stringify(error, null, 2))
    }
  }

  createBookInput(book: Book): BookInputVar {
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
          // bookUsingPublicationId: {
          //   create: [
          //     {
          //     ...bookNoAuthors
          //     }
          //   ]
          // }
        }
      }
    }
  }

  getBookPublicationId(input: BookInputVar): string {
    return input.bookInput.publication.publicationId;
  }

  async findOrCreateAuthor(name: string, publicationId: string) {
    let author = await this.findAuthor(name);
    if (author) {

    }
  }

  async connectAuthorAndPublication(authorId: string, publicationId) {

  }

  async findAuthor(name: string) {
    const getAuthorVar: GetAuthorVar = { fullName: name};
    const authorResponse = await this.graphQLClient.request(GET_AUTHOR, getAuthorVar);
    return authorResponse.author;
  }

  async createAuthor(name: string, publicationId: string) {
    const createAuthorVar = this.createAuthorInput(name, publicationId);
    const authorResponse = await this.graphQLClient.request(CREATE_AUTHOR, createAuthorVar);
    return authorResponse.author;
  }

  createAuthorInput(name: string, publicationId: string): AuthorInputVar {
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
    }
  }
}