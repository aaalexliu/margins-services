import { GraphQLClient, gql }  from 'graphql-request';

import {
  CreatePublicationInput,
  CreateAuthorInput,
  CreatePublicationAuthorInput,
} from '../__generated__/types';

import DataMapper from './data-mapper';

const CREATE_AUTHOR = gql`
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
          bookTitle
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
    authorByFullName(fullName: $fullName) {
      authorId
      fullName
    }
  }
`;

const CONNECT_AUTHOR = gql`
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

export default class BookMapper extends DataMapper{
  accountId: string;

  constructor(endpoint: string, authToken: string, accountId: string) {
    super(endpoint, authToken);
    this.accountId = accountId;
  }

  async findOrCreateBook(book: Book) {
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
    return {
      publicationId,
      authorIds: authorResponses.map(author => author.authorId)
    }
  }

  async findBookByTitle(book: Book): Promise<BookResponse> {
    const title = book.title;
    const GetPublicationVar = this.createGetPublicationVar(title);
    const response = await this.graphQLClient.request(GET_PUBLICATION, GetPublicationVar);
    console.log('get publication response', response);
    return response.publicationByAccountIdAndTitle;
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
      return bookResponse.createPublication.publication;
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

  // getBookPublicationId(input: BookInputVar): string {
  //   return input.bookInput.publication.publicationId;
  // }

  async findOrCreateAuthor(fullName: string, publicationId: string) {
    let author = await this.findAuthor(fullName);
    if (author) {
      const connectAuthorResponse = await this.connectAuthorAndPublication(author.authorId, publicationId);
      if (connectAuthorResponse) return author;
      else return `error in linking existing author ${author}`;
    }

    author = await this.createAuthor(fullName, publicationId);
    return author;
  }

  async connectAuthorAndPublication(authorId: string, publicationId: string) {
    const connectAuthorPublicationVar = this.createPublicationAuthorInput(authorId, publicationId);
    try {
      const response = await this.graphQLClient.request(CONNECT_AUTHOR, connectAuthorPublicationVar);
      console.log('connectAuthorAndPublication response', response);
      return response;
    } catch(error) {
      console.log('catching..');
      console.log(error.response)
      const errors = error.response.errors;
      if (errors[0].message === `duplicate key value violates unique constraint "publication_author_pkey"`) {
        return `relation between author: ${authorId} and publication ${publicationId} already exists`;
      }
      throw error;
    }
  }

  createPublicationAuthorInput(authorId: string, publicationId: string): 
    {authorAndPublication: CreatePublicationAuthorInput}
  {
    return {
      authorAndPublication: {
        publicationAuthor: {
          authorId,
          publicationId
        }
      }
    }
  }

  async findAuthor(fullName: string) {
    const getAuthorVar: GetAuthorVar = { fullName };
    const authorResponse = await this.graphQLClient.request(GET_AUTHOR, getAuthorVar);
    console.log('find author response', authorResponse);
    return authorResponse.authorByFullName;
  }

  async createAuthor(fullName: string, publicationId: string) {
    const createAuthorVar = this.createAuthorInput(fullName, publicationId);
    const authorResponse = await this.graphQLClient.request(CREATE_AUTHOR, createAuthorVar);
    console.log('create author response', authorResponse);
    return authorResponse.createAuthor.author;
  }

  createAuthorInput(fullName: string, publicationId: string): AuthorInputVar {
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
    }
  }
}