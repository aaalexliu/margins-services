export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
  /** A point in time as described by the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone. */
  Datetime: any;
  /** A JavaScript object encoded in the JSON format as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The day, does not include a time. */
  Date: any;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Exposes the root query type nested one level down. This is helpful for Relay 1 which can only query top level fields if they are in a particular form. */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  id: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Account`. */
  allAccounts?: Maybe<AccountsConnection>;
  /** Reads and enables pagination through a set of `AccountPublication`. */
  allAccountPublications?: Maybe<AccountPublicationsConnection>;
  /** Reads and enables pagination through a set of `AccountTagAnnotation`. */
  allAccountTagAnnotations?: Maybe<AccountTagAnnotationsConnection>;
  /** Reads and enables pagination through a set of `Annotation`. */
  allAnnotations?: Maybe<AnnotationsConnection>;
  /** Reads and enables pagination through a set of `AnnotationTag`. */
  allAnnotationTags?: Maybe<AnnotationTagsConnection>;
  /** Reads and enables pagination through a set of `Author`. */
  allAuthors?: Maybe<AuthorsConnection>;
  /** Reads and enables pagination through a set of `Book`. */
  allBooks?: Maybe<BooksConnection>;
  /** Reads and enables pagination through a set of `Publication`. */
  allPublications?: Maybe<PublicationsConnection>;
  /** Reads and enables pagination through a set of `PublicationAuthor`. */
  allPublicationAuthors?: Maybe<PublicationAuthorsConnection>;
  /** Reads and enables pagination through a set of `Tag`. */
  allTags?: Maybe<TagsConnection>;
  accountByAccountId?: Maybe<Account>;
  accountByEmail?: Maybe<Account>;
  accountPublicationByAccountIdAndPublicationId?: Maybe<AccountPublication>;
  annotationByAnnotationId?: Maybe<Annotation>;
  annotationTagByAnnotationIdAndTagId?: Maybe<AnnotationTag>;
  authorByAuthorId?: Maybe<Author>;
  bookByPublicationId?: Maybe<Book>;
  bookByTitle?: Maybe<Book>;
  publicationByPublicationId?: Maybe<Publication>;
  publicationAuthorByPublicationIdAndAuthorId?: Maybe<PublicationAuthor>;
  tagByTagId?: Maybe<Tag>;
  currentAccountId?: Maybe<Scalars['UUID']>;
  isValidMongoId?: Maybe<Scalars['Boolean']>;
  /** Reads a single `Account` using its globally unique `ID`. */
  account?: Maybe<Account>;
  /** Reads a single `AccountPublication` using its globally unique `ID`. */
  accountPublication?: Maybe<AccountPublication>;
  /** Reads a single `Annotation` using its globally unique `ID`. */
  annotation?: Maybe<Annotation>;
  /** Reads a single `AnnotationTag` using its globally unique `ID`. */
  annotationTag?: Maybe<AnnotationTag>;
  /** Reads a single `Author` using its globally unique `ID`. */
  author?: Maybe<Author>;
  /** Reads a single `Book` using its globally unique `ID`. */
  book?: Maybe<Book>;
  /** Reads a single `Publication` using its globally unique `ID`. */
  publication?: Maybe<Publication>;
  /** Reads a single `PublicationAuthor` using its globally unique `ID`. */
  publicationAuthor?: Maybe<PublicationAuthor>;
  /** Reads a single `Tag` using its globally unique `ID`. */
  tag?: Maybe<Tag>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAccountsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAccountPublicationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountPublicationsOrderBy>>;
  condition?: Maybe<AccountPublicationCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAccountTagAnnotationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountTagAnnotationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAnnotationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
  condition?: Maybe<AnnotationCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAnnotationTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationTagsOrderBy>>;
  condition?: Maybe<AnnotationTagCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllAuthorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AuthorsOrderBy>>;
  condition?: Maybe<AuthorCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllBooksArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BooksOrderBy>>;
  condition?: Maybe<BookCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPublicationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
  condition?: Maybe<PublicationCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllPublicationAuthorsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationAuthorsOrderBy>>;
  condition?: Maybe<PublicationAuthorCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllTagsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TagsOrderBy>>;
  condition?: Maybe<TagCondition>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByAccountIdArgs = {
  accountId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountPublicationByAccountIdAndPublicationIdArgs = {
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAnnotationByAnnotationIdArgs = {
  annotationId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAnnotationTagByAnnotationIdAndTagIdArgs = {
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAuthorByAuthorIdArgs = {
  authorId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookByPublicationIdArgs = {
  publicationId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookByTitleArgs = {
  title: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPublicationByPublicationIdArgs = {
  publicationId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPublicationAuthorByPublicationIdAndAuthorIdArgs = {
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagByTagIdArgs = {
  tagId: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryIsValidMongoIdArgs = {
  id?: Maybe<Scalars['String']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAccountPublicationArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAnnotationArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAnnotationTagArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAuthorArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBookArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPublicationArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryPublicationAuthorArgs = {
  id: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryTagArgs = {
  id: Scalars['ID'];
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
};


/** Methods to use when ordering `Account`. */
export type AccountsOrderBy = 
  | 'NATURAL'
  | 'ACCOUNT_ID_ASC'
  | 'ACCOUNT_ID_DESC'
  | 'EMAIL_ASC'
  | 'EMAIL_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Account` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
};


/** A connection to a list of `Account` values. */
export type AccountsConnection = {
  __typename?: 'AccountsConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account` and cursor to aid in pagination. */
  edges: Array<AccountsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Account = Node & {
  __typename?: 'Account';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  accountId: Scalars['UUID'];
  email: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Annotation`. */
  annotationsByAccountId: AnnotationsConnection;
  /** Reads and enables pagination through a set of `AccountPublication`. */
  accountPublicationsByAccountId: AccountPublicationsConnection;
  /** Reads and enables pagination through a set of `Tag`. */
  tagsByAccountId: TagsConnection;
  fullName?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Publication`. */
  publicationsByAnnotationAccountIdAndPublicationId: AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Publication`. */
  publicationsByAccountPublicationAccountIdAndPublicationId: AccountPublicationsByAccountPublicationAccountIdAndPublicationIdManyToManyConnection;
};


export type AccountAnnotationsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
  condition?: Maybe<AnnotationCondition>;
};


export type AccountAccountPublicationsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountPublicationsOrderBy>>;
  condition?: Maybe<AccountPublicationCondition>;
};


export type AccountTagsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TagsOrderBy>>;
  condition?: Maybe<TagCondition>;
};


export type AccountPublicationsByAnnotationAccountIdAndPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
  condition?: Maybe<PublicationCondition>;
};


export type AccountPublicationsByAccountPublicationAccountIdAndPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
  condition?: Maybe<PublicationCondition>;
};


/** Methods to use when ordering `Annotation`. */
export type AnnotationsOrderBy = 
  | 'NATURAL'
  | 'ANNOTATION_ID_ASC'
  | 'ANNOTATION_ID_DESC'
  | 'PUBLICATION_ID_ASC'
  | 'PUBLICATION_ID_DESC'
  | 'ACCOUNT_ID_ASC'
  | 'ACCOUNT_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Annotation` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AnnotationCondition = {
  /** Checks for equality with the object’s `annotationId` field. */
  annotationId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `publicationId` field. */
  publicationId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Annotation` values. */
export type AnnotationsConnection = {
  __typename?: 'AnnotationsConnection';
  /** A list of `Annotation` objects. */
  nodes: Array<Maybe<Annotation>>;
  /** A list of edges which contains the `Annotation` and cursor to aid in pagination. */
  edges: Array<AnnotationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Annotation` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type Annotation = Node & {
  __typename?: 'Annotation';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  annotationId: Scalars['String'];
  publicationId: Scalars['String'];
  accountId: Scalars['UUID'];
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  /** Reads a single `Publication` that is related to this `Annotation`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Account` that is related to this `Annotation`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `AnnotationTag`. */
  annotationTagsByAnnotationId: AnnotationTagsConnection;
  /** Reads and enables pagination through a set of `Tag`. */
  tagsByAnnotationTagAnnotationIdAndTagId: AnnotationTagsByAnnotationTagAnnotationIdAndTagIdManyToManyConnection;
};


export type AnnotationAnnotationTagsByAnnotationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationTagsOrderBy>>;
  condition?: Maybe<AnnotationTagCondition>;
};


export type AnnotationTagsByAnnotationTagAnnotationIdAndTagIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<TagsOrderBy>>;
  condition?: Maybe<TagCondition>;
};


export type Publication = Node & {
  __typename?: 'Publication';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  publicationId: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Book` that is related to this `Publication`. */
  bookByPublicationId?: Maybe<Book>;
  /**
   * Reads and enables pagination through a set of `Book`.
   * @deprecated Please use bookByPublicationId instead
   */
  booksByPublicationId: BooksConnection;
  /** Reads and enables pagination through a set of `Annotation`. */
  annotationsByPublicationId: AnnotationsConnection;
  /** Reads and enables pagination through a set of `PublicationAuthor`. */
  publicationAuthorsByPublicationId: PublicationAuthorsConnection;
  /** Reads and enables pagination through a set of `AccountPublication`. */
  accountPublicationsByPublicationId: AccountPublicationsConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByAnnotationPublicationIdAndAccountId: PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Author`. */
  authorsByPublicationAuthorPublicationIdAndAuthorId: PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdManyToManyConnection;
  /** Reads and enables pagination through a set of `Account`. */
  accountsByAccountPublicationPublicationIdAndAccountId: PublicationAccountsByAccountPublicationPublicationIdAndAccountIdManyToManyConnection;
};


export type PublicationBooksByPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BooksOrderBy>>;
  condition?: Maybe<BookCondition>;
};


export type PublicationAnnotationsByPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
  condition?: Maybe<AnnotationCondition>;
};


export type PublicationPublicationAuthorsByPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationAuthorsOrderBy>>;
  condition?: Maybe<PublicationAuthorCondition>;
};


export type PublicationAccountPublicationsByPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountPublicationsOrderBy>>;
  condition?: Maybe<AccountPublicationCondition>;
};


export type PublicationAccountsByAnnotationPublicationIdAndAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};


export type PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AuthorsOrderBy>>;
  condition?: Maybe<AuthorCondition>;
};


export type PublicationAccountsByAccountPublicationPublicationIdAndAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AccountsOrderBy>>;
  condition?: Maybe<AccountCondition>;
};

export type Book = Node & {
  __typename?: 'Book';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  publicationId: Scalars['String'];
  isbn13?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  languageCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  publicationDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  bookType?: Maybe<Scalars['String']>;
  /** Reads a single `Publication` that is related to this `Book`. */
  publicationByPublicationId?: Maybe<Publication>;
};


/** Methods to use when ordering `Book`. */
export type BooksOrderBy = 
  | 'NATURAL'
  | 'PUBLICATION_ID_ASC'
  | 'PUBLICATION_ID_DESC'
  | 'TITLE_ASC'
  | 'TITLE_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Book` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BookCondition = {
  /** Checks for equality with the object’s `publicationId` field. */
  publicationId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `title` field. */
  title?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Book` values. */
export type BooksConnection = {
  __typename?: 'BooksConnection';
  /** A list of `Book` objects. */
  nodes: Array<Maybe<Book>>;
  /** A list of edges which contains the `Book` and cursor to aid in pagination. */
  edges: Array<BooksEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Book` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Book` edge in the connection. */
export type BooksEdge = {
  __typename?: 'BooksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Book` at the end of the edge. */
  node?: Maybe<Book>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** Methods to use when ordering `PublicationAuthor`. */
export type PublicationAuthorsOrderBy = 
  | 'NATURAL'
  | 'PUBLICATION_ID_ASC'
  | 'PUBLICATION_ID_DESC'
  | 'AUTHOR_ID_ASC'
  | 'AUTHOR_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `PublicationAuthor` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PublicationAuthorCondition = {
  /** Checks for equality with the object’s `publicationId` field. */
  publicationId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `PublicationAuthor` values. */
export type PublicationAuthorsConnection = {
  __typename?: 'PublicationAuthorsConnection';
  /** A list of `PublicationAuthor` objects. */
  nodes: Array<Maybe<PublicationAuthor>>;
  /** A list of edges which contains the `PublicationAuthor` and cursor to aid in pagination. */
  edges: Array<PublicationAuthorsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `PublicationAuthor` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type PublicationAuthor = Node & {
  __typename?: 'PublicationAuthor';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
  /** Reads a single `Publication` that is related to this `PublicationAuthor`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Author` that is related to this `PublicationAuthor`. */
  authorByAuthorId?: Maybe<Author>;
};

export type Author = Node & {
  __typename?: 'Author';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  authorId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `PublicationAuthor`. */
  publicationAuthorsByAuthorId: PublicationAuthorsConnection;
  /** Reads and enables pagination through a set of `Publication`. */
  publicationsByPublicationAuthorAuthorIdAndPublicationId: AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdManyToManyConnection;
};


export type AuthorPublicationAuthorsByAuthorIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationAuthorsOrderBy>>;
  condition?: Maybe<PublicationAuthorCondition>;
};


export type AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
  condition?: Maybe<PublicationCondition>;
};

/** Methods to use when ordering `Publication`. */
export type PublicationsOrderBy = 
  | 'NATURAL'
  | 'PUBLICATION_ID_ASC'
  | 'PUBLICATION_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Publication` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type PublicationCondition = {
  /** Checks for equality with the object’s `publicationId` field. */
  publicationId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Publication` values, with data from `PublicationAuthor`. */
export type AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdManyToManyConnection = {
  __typename?: 'AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdManyToManyConnection';
  /** A list of `Publication` objects. */
  nodes: Array<Maybe<Publication>>;
  /** A list of edges which contains the `Publication`, info from the `PublicationAuthor`, and the cursor to aid in pagination. */
  edges: Array<AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Publication` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Publication` edge in the connection, with data from `PublicationAuthor`. */
export type AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdManyToManyEdge = {
  __typename?: 'AuthorPublicationsByPublicationAuthorAuthorIdAndPublicationIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Publication` at the end of the edge. */
  node?: Maybe<Publication>;
};

/** A `PublicationAuthor` edge in the connection. */
export type PublicationAuthorsEdge = {
  __typename?: 'PublicationAuthorsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `PublicationAuthor` at the end of the edge. */
  node?: Maybe<PublicationAuthor>;
};

/** Methods to use when ordering `AccountPublication`. */
export type AccountPublicationsOrderBy = 
  | 'NATURAL'
  | 'ACCOUNT_ID_ASC'
  | 'ACCOUNT_ID_DESC'
  | 'PUBLICATION_ID_ASC'
  | 'PUBLICATION_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `AccountPublication` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AccountPublicationCondition = {
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `publicationId` field. */
  publicationId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `AccountPublication` values. */
export type AccountPublicationsConnection = {
  __typename?: 'AccountPublicationsConnection';
  /** A list of `AccountPublication` objects. */
  nodes: Array<Maybe<AccountPublication>>;
  /** A list of edges which contains the `AccountPublication` and cursor to aid in pagination. */
  edges: Array<AccountPublicationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AccountPublication` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type AccountPublication = Node & {
  __typename?: 'AccountPublication';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
  /** Reads a single `Account` that is related to this `AccountPublication`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Publication` that is related to this `AccountPublication`. */
  publicationByPublicationId?: Maybe<Publication>;
};

/** A `AccountPublication` edge in the connection. */
export type AccountPublicationsEdge = {
  __typename?: 'AccountPublicationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AccountPublication` at the end of the edge. */
  node?: Maybe<AccountPublication>;
};

/** A connection to a list of `Account` values, with data from `Annotation`. */
export type PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyConnection = {
  __typename?: 'PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `Annotation`, and the cursor to aid in pagination. */
  edges: Array<PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `Annotation`. */
export type PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyEdge = {
  __typename?: 'PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
  /** Reads and enables pagination through a set of `Annotation`. */
  annotationsByAccountId: AnnotationsConnection;
};


/** A `Account` edge in the connection, with data from `Annotation`. */
export type PublicationAccountsByAnnotationPublicationIdAndAccountIdManyToManyEdgeAnnotationsByAccountIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
  condition?: Maybe<AnnotationCondition>;
};

/** Methods to use when ordering `Author`. */
export type AuthorsOrderBy = 
  | 'NATURAL'
  | 'AUTHOR_ID_ASC'
  | 'AUTHOR_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Author` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AuthorCondition = {
  /** Checks for equality with the object’s `authorId` field. */
  authorId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Author` values, with data from `PublicationAuthor`. */
export type PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdManyToManyConnection = {
  __typename?: 'PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdManyToManyConnection';
  /** A list of `Author` objects. */
  nodes: Array<Maybe<Author>>;
  /** A list of edges which contains the `Author`, info from the `PublicationAuthor`, and the cursor to aid in pagination. */
  edges: Array<PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Author` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Author` edge in the connection, with data from `PublicationAuthor`. */
export type PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdManyToManyEdge = {
  __typename?: 'PublicationAuthorsByPublicationAuthorPublicationIdAndAuthorIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Author` at the end of the edge. */
  node?: Maybe<Author>;
};

/** A connection to a list of `Account` values, with data from `AccountPublication`. */
export type PublicationAccountsByAccountPublicationPublicationIdAndAccountIdManyToManyConnection = {
  __typename?: 'PublicationAccountsByAccountPublicationPublicationIdAndAccountIdManyToManyConnection';
  /** A list of `Account` objects. */
  nodes: Array<Maybe<Account>>;
  /** A list of edges which contains the `Account`, info from the `AccountPublication`, and the cursor to aid in pagination. */
  edges: Array<PublicationAccountsByAccountPublicationPublicationIdAndAccountIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Account` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Account` edge in the connection, with data from `AccountPublication`. */
export type PublicationAccountsByAccountPublicationPublicationIdAndAccountIdManyToManyEdge = {
  __typename?: 'PublicationAccountsByAccountPublicationPublicationIdAndAccountIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
};

/** Methods to use when ordering `AnnotationTag`. */
export type AnnotationTagsOrderBy = 
  | 'NATURAL'
  | 'ANNOTATION_ID_ASC'
  | 'ANNOTATION_ID_DESC'
  | 'TAG_ID_ASC'
  | 'TAG_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `AnnotationTag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AnnotationTagCondition = {
  /** Checks for equality with the object’s `annotationId` field. */
  annotationId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: Maybe<Scalars['String']>;
};

/** A connection to a list of `AnnotationTag` values. */
export type AnnotationTagsConnection = {
  __typename?: 'AnnotationTagsConnection';
  /** A list of `AnnotationTag` objects. */
  nodes: Array<Maybe<AnnotationTag>>;
  /** A list of edges which contains the `AnnotationTag` and cursor to aid in pagination. */
  edges: Array<AnnotationTagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AnnotationTag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type AnnotationTag = Node & {
  __typename?: 'AnnotationTag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
  /** Reads a single `Annotation` that is related to this `AnnotationTag`. */
  annotationByAnnotationId?: Maybe<Annotation>;
  /** Reads a single `Tag` that is related to this `AnnotationTag`. */
  tagByTagId?: Maybe<Tag>;
};

export type Tag = Node & {
  __typename?: 'Tag';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  id: Scalars['ID'];
  tagId: Scalars['String'];
  name: Scalars['String'];
  accountId: Scalars['UUID'];
  /** Reads a single `Account` that is related to this `Tag`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads and enables pagination through a set of `AnnotationTag`. */
  annotationTagsByTagId: AnnotationTagsConnection;
  /** Reads and enables pagination through a set of `Annotation`. */
  annotationsByAnnotationTagTagIdAndAnnotationId: TagAnnotationsByAnnotationTagTagIdAndAnnotationIdManyToManyConnection;
};


export type TagAnnotationTagsByTagIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationTagsOrderBy>>;
  condition?: Maybe<AnnotationTagCondition>;
};


export type TagAnnotationsByAnnotationTagTagIdAndAnnotationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
  condition?: Maybe<AnnotationCondition>;
};

/** A connection to a list of `Annotation` values, with data from `AnnotationTag`. */
export type TagAnnotationsByAnnotationTagTagIdAndAnnotationIdManyToManyConnection = {
  __typename?: 'TagAnnotationsByAnnotationTagTagIdAndAnnotationIdManyToManyConnection';
  /** A list of `Annotation` objects. */
  nodes: Array<Maybe<Annotation>>;
  /** A list of edges which contains the `Annotation`, info from the `AnnotationTag`, and the cursor to aid in pagination. */
  edges: Array<TagAnnotationsByAnnotationTagTagIdAndAnnotationIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Annotation` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Annotation` edge in the connection, with data from `AnnotationTag`. */
export type TagAnnotationsByAnnotationTagTagIdAndAnnotationIdManyToManyEdge = {
  __typename?: 'TagAnnotationsByAnnotationTagTagIdAndAnnotationIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Annotation` at the end of the edge. */
  node?: Maybe<Annotation>;
};

/** A `AnnotationTag` edge in the connection. */
export type AnnotationTagsEdge = {
  __typename?: 'AnnotationTagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AnnotationTag` at the end of the edge. */
  node?: Maybe<AnnotationTag>;
};

/** Methods to use when ordering `Tag`. */
export type TagsOrderBy = 
  | 'NATURAL'
  | 'TAG_ID_ASC'
  | 'TAG_ID_DESC'
  | 'ACCOUNT_ID_ASC'
  | 'ACCOUNT_ID_DESC'
  | 'PRIMARY_KEY_ASC'
  | 'PRIMARY_KEY_DESC';

/** A condition to be used against `Tag` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type TagCondition = {
  /** Checks for equality with the object’s `tagId` field. */
  tagId?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `accountId` field. */
  accountId?: Maybe<Scalars['UUID']>;
};

/** A connection to a list of `Tag` values, with data from `AnnotationTag`. */
export type AnnotationTagsByAnnotationTagAnnotationIdAndTagIdManyToManyConnection = {
  __typename?: 'AnnotationTagsByAnnotationTagAnnotationIdAndTagIdManyToManyConnection';
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** A list of edges which contains the `Tag`, info from the `AnnotationTag`, and the cursor to aid in pagination. */
  edges: Array<AnnotationTagsByAnnotationTagAnnotationIdAndTagIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Tag` edge in the connection, with data from `AnnotationTag`. */
export type AnnotationTagsByAnnotationTagAnnotationIdAndTagIdManyToManyEdge = {
  __typename?: 'AnnotationTagsByAnnotationTagAnnotationIdAndTagIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** A `Annotation` edge in the connection. */
export type AnnotationsEdge = {
  __typename?: 'AnnotationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Annotation` at the end of the edge. */
  node?: Maybe<Annotation>;
};

/** A connection to a list of `Tag` values. */
export type TagsConnection = {
  __typename?: 'TagsConnection';
  /** A list of `Tag` objects. */
  nodes: Array<Maybe<Tag>>;
  /** A list of edges which contains the `Tag` and cursor to aid in pagination. */
  edges: Array<TagsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Tag` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Tag` edge in the connection. */
export type TagsEdge = {
  __typename?: 'TagsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Tag` at the end of the edge. */
  node?: Maybe<Tag>;
};

/** A connection to a list of `Publication` values, with data from `Annotation`. */
export type AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyConnection = {
  __typename?: 'AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyConnection';
  /** A list of `Publication` objects. */
  nodes: Array<Maybe<Publication>>;
  /** A list of edges which contains the `Publication`, info from the `Annotation`, and the cursor to aid in pagination. */
  edges: Array<AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Publication` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Publication` edge in the connection, with data from `Annotation`. */
export type AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyEdge = {
  __typename?: 'AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Publication` at the end of the edge. */
  node?: Maybe<Publication>;
  /** Reads and enables pagination through a set of `Annotation`. */
  annotationsByPublicationId: AnnotationsConnection;
};


/** A `Publication` edge in the connection, with data from `Annotation`. */
export type AccountPublicationsByAnnotationAccountIdAndPublicationIdManyToManyEdgeAnnotationsByPublicationIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
  condition?: Maybe<AnnotationCondition>;
};

/** A connection to a list of `Publication` values, with data from `AccountPublication`. */
export type AccountPublicationsByAccountPublicationAccountIdAndPublicationIdManyToManyConnection = {
  __typename?: 'AccountPublicationsByAccountPublicationAccountIdAndPublicationIdManyToManyConnection';
  /** A list of `Publication` objects. */
  nodes: Array<Maybe<Publication>>;
  /** A list of edges which contains the `Publication`, info from the `AccountPublication`, and the cursor to aid in pagination. */
  edges: Array<AccountPublicationsByAccountPublicationAccountIdAndPublicationIdManyToManyEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Publication` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Publication` edge in the connection, with data from `AccountPublication`. */
export type AccountPublicationsByAccountPublicationAccountIdAndPublicationIdManyToManyEdge = {
  __typename?: 'AccountPublicationsByAccountPublicationAccountIdAndPublicationIdManyToManyEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Publication` at the end of the edge. */
  node?: Maybe<Publication>;
};

/** A `Account` edge in the connection. */
export type AccountsEdge = {
  __typename?: 'AccountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Account` at the end of the edge. */
  node?: Maybe<Account>;
};

/** Methods to use when ordering `AccountTagAnnotation`. */
export type AccountTagAnnotationsOrderBy = 
  | 'NATURAL';

/** A connection to a list of `AccountTagAnnotation` values. */
export type AccountTagAnnotationsConnection = {
  __typename?: 'AccountTagAnnotationsConnection';
  /** A list of `AccountTagAnnotation` objects. */
  nodes: Array<Maybe<AccountTagAnnotation>>;
  /** A list of edges which contains the `AccountTagAnnotation` and cursor to aid in pagination. */
  edges: Array<AccountTagAnnotationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `AccountTagAnnotation` you could get from the connection. */
  totalCount: Scalars['Int'];
};

export type AccountTagAnnotation = {
  __typename?: 'AccountTagAnnotation';
  accountId?: Maybe<Scalars['UUID']>;
  annotationId?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
};

/** A `AccountTagAnnotation` edge in the connection. */
export type AccountTagAnnotationsEdge = {
  __typename?: 'AccountTagAnnotationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `AccountTagAnnotation` at the end of the edge. */
  node?: Maybe<AccountTagAnnotation>;
};

/** A connection to a list of `Author` values. */
export type AuthorsConnection = {
  __typename?: 'AuthorsConnection';
  /** A list of `Author` objects. */
  nodes: Array<Maybe<Author>>;
  /** A list of edges which contains the `Author` and cursor to aid in pagination. */
  edges: Array<AuthorsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Author` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Author` edge in the connection. */
export type AuthorsEdge = {
  __typename?: 'AuthorsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Author` at the end of the edge. */
  node?: Maybe<Author>;
};

/** A connection to a list of `Publication` values. */
export type PublicationsConnection = {
  __typename?: 'PublicationsConnection';
  /** A list of `Publication` objects. */
  nodes: Array<Maybe<Publication>>;
  /** A list of edges which contains the `Publication` and cursor to aid in pagination. */
  edges: Array<PublicationsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Publication` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Publication` edge in the connection. */
export type PublicationsEdge = {
  __typename?: 'PublicationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Publication` at the end of the edge. */
  node?: Maybe<Publication>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Account`. */
  createAccount?: Maybe<CreateAccountPayload>;
  /** Creates a single `AccountPublication`. */
  createAccountPublication?: Maybe<CreateAccountPublicationPayload>;
  /** Creates a single `Annotation`. */
  createAnnotation?: Maybe<CreateAnnotationPayload>;
  /** Creates a single `AnnotationTag`. */
  createAnnotationTag?: Maybe<CreateAnnotationTagPayload>;
  /** Creates a single `Author`. */
  createAuthor?: Maybe<CreateAuthorPayload>;
  /** Creates a single `Book`. */
  createBook?: Maybe<CreateBookPayload>;
  /** Creates a single `Publication`. */
  createPublication?: Maybe<CreatePublicationPayload>;
  /** Creates a single `PublicationAuthor`. */
  createPublicationAuthor?: Maybe<CreatePublicationAuthorPayload>;
  /** Creates a single `Tag`. */
  createTag?: Maybe<CreateTagPayload>;
  /** Updates a single `Account` using its globally unique id and a patch. */
  updateAccount?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountByAccountId?: Maybe<UpdateAccountPayload>;
  /** Updates a single `Account` using a unique key and a patch. */
  updateAccountByEmail?: Maybe<UpdateAccountPayload>;
  /** Updates a single `AccountPublication` using its globally unique id and a patch. */
  updateAccountPublication?: Maybe<UpdateAccountPublicationPayload>;
  /** Updates a single `AccountPublication` using a unique key and a patch. */
  updateAccountPublicationByAccountIdAndPublicationId?: Maybe<UpdateAccountPublicationPayload>;
  /** Updates a single `Annotation` using its globally unique id and a patch. */
  updateAnnotation?: Maybe<UpdateAnnotationPayload>;
  /** Updates a single `Annotation` using a unique key and a patch. */
  updateAnnotationByAnnotationId?: Maybe<UpdateAnnotationPayload>;
  /** Updates a single `AnnotationTag` using its globally unique id and a patch. */
  updateAnnotationTag?: Maybe<UpdateAnnotationTagPayload>;
  /** Updates a single `AnnotationTag` using a unique key and a patch. */
  updateAnnotationTagByAnnotationIdAndTagId?: Maybe<UpdateAnnotationTagPayload>;
  /** Updates a single `Author` using its globally unique id and a patch. */
  updateAuthor?: Maybe<UpdateAuthorPayload>;
  /** Updates a single `Author` using a unique key and a patch. */
  updateAuthorByAuthorId?: Maybe<UpdateAuthorPayload>;
  /** Updates a single `Book` using its globally unique id and a patch. */
  updateBook?: Maybe<UpdateBookPayload>;
  /** Updates a single `Book` using a unique key and a patch. */
  updateBookByPublicationId?: Maybe<UpdateBookPayload>;
  /** Updates a single `Book` using a unique key and a patch. */
  updateBookByTitle?: Maybe<UpdateBookPayload>;
  /** Updates a single `Publication` using its globally unique id and a patch. */
  updatePublication?: Maybe<UpdatePublicationPayload>;
  /** Updates a single `Publication` using a unique key and a patch. */
  updatePublicationByPublicationId?: Maybe<UpdatePublicationPayload>;
  /** Updates a single `PublicationAuthor` using its globally unique id and a patch. */
  updatePublicationAuthor?: Maybe<UpdatePublicationAuthorPayload>;
  /** Updates a single `PublicationAuthor` using a unique key and a patch. */
  updatePublicationAuthorByPublicationIdAndAuthorId?: Maybe<UpdatePublicationAuthorPayload>;
  /** Updates a single `Tag` using its globally unique id and a patch. */
  updateTag?: Maybe<UpdateTagPayload>;
  /** Updates a single `Tag` using a unique key and a patch. */
  updateTagByTagId?: Maybe<UpdateTagPayload>;
  /** Deletes a single `Account` using its globally unique id. */
  deleteAccount?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByAccountId?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `Account` using a unique key. */
  deleteAccountByEmail?: Maybe<DeleteAccountPayload>;
  /** Deletes a single `AccountPublication` using its globally unique id. */
  deleteAccountPublication?: Maybe<DeleteAccountPublicationPayload>;
  /** Deletes a single `AccountPublication` using a unique key. */
  deleteAccountPublicationByAccountIdAndPublicationId?: Maybe<DeleteAccountPublicationPayload>;
  /** Deletes a single `Annotation` using its globally unique id. */
  deleteAnnotation?: Maybe<DeleteAnnotationPayload>;
  /** Deletes a single `Annotation` using a unique key. */
  deleteAnnotationByAnnotationId?: Maybe<DeleteAnnotationPayload>;
  /** Deletes a single `AnnotationTag` using its globally unique id. */
  deleteAnnotationTag?: Maybe<DeleteAnnotationTagPayload>;
  /** Deletes a single `AnnotationTag` using a unique key. */
  deleteAnnotationTagByAnnotationIdAndTagId?: Maybe<DeleteAnnotationTagPayload>;
  /** Deletes a single `Author` using its globally unique id. */
  deleteAuthor?: Maybe<DeleteAuthorPayload>;
  /** Deletes a single `Author` using a unique key. */
  deleteAuthorByAuthorId?: Maybe<DeleteAuthorPayload>;
  /** Deletes a single `Book` using its globally unique id. */
  deleteBook?: Maybe<DeleteBookPayload>;
  /** Deletes a single `Book` using a unique key. */
  deleteBookByPublicationId?: Maybe<DeleteBookPayload>;
  /** Deletes a single `Book` using a unique key. */
  deleteBookByTitle?: Maybe<DeleteBookPayload>;
  /** Deletes a single `Publication` using its globally unique id. */
  deletePublication?: Maybe<DeletePublicationPayload>;
  /** Deletes a single `Publication` using a unique key. */
  deletePublicationByPublicationId?: Maybe<DeletePublicationPayload>;
  /** Deletes a single `PublicationAuthor` using its globally unique id. */
  deletePublicationAuthor?: Maybe<DeletePublicationAuthorPayload>;
  /** Deletes a single `PublicationAuthor` using a unique key. */
  deletePublicationAuthorByPublicationIdAndAuthorId?: Maybe<DeletePublicationAuthorPayload>;
  /** Deletes a single `Tag` using its globally unique id. */
  deleteTag?: Maybe<DeleteTagPayload>;
  /** Deletes a single `Tag` using a unique key. */
  deleteTagByTagId?: Maybe<DeleteTagPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAccountPublicationArgs = {
  input: CreateAccountPublicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAnnotationArgs = {
  input: CreateAnnotationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAnnotationTagArgs = {
  input: CreateAnnotationTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateAuthorArgs = {
  input: CreateAuthorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBookArgs = {
  input: CreateBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePublicationArgs = {
  input: CreatePublicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreatePublicationAuthorArgs = {
  input: CreatePublicationAuthorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateTagArgs = {
  input: CreateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountArgs = {
  input: UpdateAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByAccountIdArgs = {
  input: UpdateAccountByAccountIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountByEmailArgs = {
  input: UpdateAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountPublicationArgs = {
  input: UpdateAccountPublicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAccountPublicationByAccountIdAndPublicationIdArgs = {
  input: UpdateAccountPublicationByAccountIdAndPublicationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAnnotationArgs = {
  input: UpdateAnnotationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAnnotationByAnnotationIdArgs = {
  input: UpdateAnnotationByAnnotationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAnnotationTagArgs = {
  input: UpdateAnnotationTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAnnotationTagByAnnotationIdAndTagIdArgs = {
  input: UpdateAnnotationTagByAnnotationIdAndTagIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAuthorArgs = {
  input: UpdateAuthorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAuthorByAuthorIdArgs = {
  input: UpdateAuthorByAuthorIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookArgs = {
  input: UpdateBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookByPublicationIdArgs = {
  input: UpdateBookByPublicationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBookByTitleArgs = {
  input: UpdateBookByTitleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePublicationArgs = {
  input: UpdatePublicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePublicationByPublicationIdArgs = {
  input: UpdatePublicationByPublicationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePublicationAuthorArgs = {
  input: UpdatePublicationAuthorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdatePublicationAuthorByPublicationIdAndAuthorIdArgs = {
  input: UpdatePublicationAuthorByPublicationIdAndAuthorIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagArgs = {
  input: UpdateTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateTagByTagIdArgs = {
  input: UpdateTagByTagIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountArgs = {
  input: DeleteAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByAccountIdArgs = {
  input: DeleteAccountByAccountIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountByEmailArgs = {
  input: DeleteAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountPublicationArgs = {
  input: DeleteAccountPublicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAccountPublicationByAccountIdAndPublicationIdArgs = {
  input: DeleteAccountPublicationByAccountIdAndPublicationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAnnotationArgs = {
  input: DeleteAnnotationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAnnotationByAnnotationIdArgs = {
  input: DeleteAnnotationByAnnotationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAnnotationTagArgs = {
  input: DeleteAnnotationTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAnnotationTagByAnnotationIdAndTagIdArgs = {
  input: DeleteAnnotationTagByAnnotationIdAndTagIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAuthorArgs = {
  input: DeleteAuthorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAuthorByAuthorIdArgs = {
  input: DeleteAuthorByAuthorIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookArgs = {
  input: DeleteBookInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookByPublicationIdArgs = {
  input: DeleteBookByPublicationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBookByTitleArgs = {
  input: DeleteBookByTitleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePublicationArgs = {
  input: DeletePublicationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePublicationByPublicationIdArgs = {
  input: DeletePublicationByPublicationIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePublicationAuthorArgs = {
  input: DeletePublicationAuthorInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeletePublicationAuthorByPublicationIdAndAuthorIdArgs = {
  input: DeletePublicationAuthorByPublicationIdAndAuthorIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagArgs = {
  input: DeleteTagInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteTagByTagIdArgs = {
  input: DeleteTagByTagIdInput;
};

/** All input for the create `Account` mutation. */
export type CreateAccountInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` to be created by this mutation. */
  account: AccountInput;
};

/** An input for mutations affecting `Account` */
export type AccountInput = {
  accountId: Scalars['UUID'];
  email: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** Input for the nested mutation of `annotation` in the `AccountInput` mutation. */
export type AnnotationAccountIdFkeyInverseInput = {
  /** Flag indicating whether all other `annotation` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  connectByAnnotationId?: Maybe<Array<AnnotationAnnotationPkeyConnect>>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  connectById?: Maybe<Array<AnnotationNodeIdConnect>>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  deleteByAnnotationId?: Maybe<Array<AnnotationAnnotationPkeyDelete>>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  deleteById?: Maybe<Array<AnnotationNodeIdDelete>>;
  /** The primary key(s) and patch data for `annotation` for the far side of the relationship. */
  updateByAnnotationId?: Maybe<Array<AnnotationOnAnnotationForAnnotationAccountIdFkeyUsingAnnotationPkeyUpdate>>;
  /** The primary key(s) and patch data for `annotation` for the far side of the relationship. */
  updateById?: Maybe<Array<AccountOnAnnotationForAnnotationAccountIdFkeyNodeIdUpdate>>;
  /** A `AnnotationInput` object that will be created and connected to this object. */
  create?: Maybe<Array<AnnotationAccountIdFkeyAnnotationCreateInput>>;
};

/** The fields on `annotation` to look up the row to connect. */
export type AnnotationAnnotationPkeyConnect = {
  annotationId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type AnnotationNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `annotation` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `annotation` to look up the row to delete. */
export type AnnotationAnnotationPkeyDelete = {
  annotationId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type AnnotationNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `annotation` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `annotation` to look up the row to update. */
export type AnnotationOnAnnotationForAnnotationAccountIdFkeyUsingAnnotationPkeyUpdate = {
  /** An object where the defined keys will be set on the `annotation` being updated. */
  annotationPatch: UpdateAnnotationOnAnnotationForAnnotationAccountIdFkeyPatch;
  annotationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `annotation` being updated. */
export type UpdateAnnotationOnAnnotationForAnnotationAccountIdFkeyPatch = {
  annotationId?: Maybe<Scalars['String']>;
  publicationId?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `publication` in the `AnnotationInput` mutation. */
export type AnnotationPublicationIdFkeyInput = {
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectByPublicationId?: Maybe<PublicationPublicationPkeyConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectById?: Maybe<PublicationNodeIdConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteByPublicationId?: Maybe<PublicationPublicationPkeyDelete>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteById?: Maybe<PublicationNodeIdDelete>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateByPublicationId?: Maybe<PublicationOnAnnotationForAnnotationPublicationIdFkeyUsingPublicationPkeyUpdate>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateById?: Maybe<AnnotationOnAnnotationForAnnotationPublicationIdFkeyNodeIdUpdate>;
  /** A `PublicationInput` object that will be created and connected to this object. */
  create?: Maybe<AnnotationPublicationIdFkeyPublicationCreateInput>;
};

/** The fields on `publication` to look up the row to connect. */
export type PublicationPublicationPkeyConnect = {
  publicationId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type PublicationNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `publication` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `publication` to look up the row to delete. */
export type PublicationPublicationPkeyDelete = {
  publicationId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type PublicationNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `publication` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `publication` to look up the row to update. */
export type PublicationOnAnnotationForAnnotationPublicationIdFkeyUsingPublicationPkeyUpdate = {
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: UpdatePublicationOnAnnotationForAnnotationPublicationIdFkeyPatch;
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `publication` being updated. */
export type UpdatePublicationOnAnnotationForAnnotationPublicationIdFkeyPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `book` in the `PublicationInput` mutation. */
export type BookPublicationIdFkeyInverseInput = {
  /** Flag indicating whether all other `book` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `book` for the far side of the relationship. */
  connectByPublicationId?: Maybe<BookBookPkeyConnect>;
  /** The primary key(s) for `book` for the far side of the relationship. */
  connectByTitle?: Maybe<BookBookTitleKeyConnect>;
  /** The primary key(s) for `book` for the far side of the relationship. */
  connectById?: Maybe<BookNodeIdConnect>;
  /** The primary key(s) for `book` for the far side of the relationship. */
  deleteByPublicationId?: Maybe<BookBookPkeyDelete>;
  /** The primary key(s) for `book` for the far side of the relationship. */
  deleteByTitle?: Maybe<BookBookTitleKeyDelete>;
  /** The primary key(s) for `book` for the far side of the relationship. */
  deleteById?: Maybe<BookNodeIdDelete>;
  /** The primary key(s) and patch data for `book` for the far side of the relationship. */
  updateByPublicationId?: Maybe<BookOnBookForBookPublicationIdFkeyUsingBookPkeyUpdate>;
  /** The primary key(s) and patch data for `book` for the far side of the relationship. */
  updateByTitle?: Maybe<BookOnBookForBookPublicationIdFkeyUsingBookTitleKeyUpdate>;
  /** The primary key(s) and patch data for `book` for the far side of the relationship. */
  updateById?: Maybe<PublicationOnBookForBookPublicationIdFkeyNodeIdUpdate>;
  /** A `BookInput` object that will be created and connected to this object. */
  create?: Maybe<Array<BookPublicationIdFkeyBookCreateInput>>;
};

/** The fields on `book` to look up the row to connect. */
export type BookBookPkeyConnect = {
  publicationId: Scalars['String'];
};

/** The fields on `book` to look up the row to connect. */
export type BookBookTitleKeyConnect = {
  title: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type BookNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `book` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `book` to look up the row to delete. */
export type BookBookPkeyDelete = {
  publicationId: Scalars['String'];
};

/** The fields on `book` to look up the row to delete. */
export type BookBookTitleKeyDelete = {
  title: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type BookNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `book` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `book` to look up the row to update. */
export type BookOnBookForBookPublicationIdFkeyUsingBookPkeyUpdate = {
  /** An object where the defined keys will be set on the `book` being updated. */
  bookPatch: UpdateBookOnBookForBookPublicationIdFkeyPatch;
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `book` being updated. */
export type UpdateBookOnBookForBookPublicationIdFkeyPatch = {
  isbn13?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  languageCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  publicationDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  bookType?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<BookPublicationIdFkeyInput>;
};

/** Input for the nested mutation of `publication` in the `BookInput` mutation. */
export type BookPublicationIdFkeyInput = {
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectByPublicationId?: Maybe<PublicationPublicationPkeyConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectById?: Maybe<PublicationNodeIdConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteByPublicationId?: Maybe<PublicationPublicationPkeyDelete>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteById?: Maybe<PublicationNodeIdDelete>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateByPublicationId?: Maybe<PublicationOnBookForBookPublicationIdFkeyUsingPublicationPkeyUpdate>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateById?: Maybe<BookOnBookForBookPublicationIdFkeyNodeIdUpdate>;
  /** A `PublicationInput` object that will be created and connected to this object. */
  create?: Maybe<BookPublicationIdFkeyPublicationCreateInput>;
};

/** The fields on `publication` to look up the row to update. */
export type PublicationOnBookForBookPublicationIdFkeyUsingPublicationPkeyUpdate = {
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: UpdatePublicationOnBookForBookPublicationIdFkeyPatch;
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `publication` being updated. */
export type UpdatePublicationOnBookForBookPublicationIdFkeyPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `annotation` in the `PublicationInput` mutation. */
export type AnnotationPublicationIdFkeyInverseInput = {
  /** Flag indicating whether all other `annotation` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  connectByAnnotationId?: Maybe<Array<AnnotationAnnotationPkeyConnect>>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  connectById?: Maybe<Array<AnnotationNodeIdConnect>>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  deleteByAnnotationId?: Maybe<Array<AnnotationAnnotationPkeyDelete>>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  deleteById?: Maybe<Array<AnnotationNodeIdDelete>>;
  /** The primary key(s) and patch data for `annotation` for the far side of the relationship. */
  updateByAnnotationId?: Maybe<Array<AnnotationOnAnnotationForAnnotationPublicationIdFkeyUsingAnnotationPkeyUpdate>>;
  /** The primary key(s) and patch data for `annotation` for the far side of the relationship. */
  updateById?: Maybe<Array<PublicationOnAnnotationForAnnotationPublicationIdFkeyNodeIdUpdate>>;
  /** A `AnnotationInput` object that will be created and connected to this object. */
  create?: Maybe<Array<AnnotationPublicationIdFkeyAnnotationCreateInput>>;
};

/** The fields on `annotation` to look up the row to update. */
export type AnnotationOnAnnotationForAnnotationPublicationIdFkeyUsingAnnotationPkeyUpdate = {
  /** An object where the defined keys will be set on the `annotation` being updated. */
  annotationPatch: UpdateAnnotationOnAnnotationForAnnotationPublicationIdFkeyPatch;
  annotationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `annotation` being updated. */
export type UpdateAnnotationOnAnnotationForAnnotationPublicationIdFkeyPatch = {
  annotationId?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `account` in the `AnnotationInput` mutation. */
export type AnnotationAccountIdFkeyInput = {
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectByAccountId?: Maybe<AccountAccountPkeyConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectByEmail?: Maybe<AccountAccountEmailKeyConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectById?: Maybe<AccountNodeIdConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteByAccountId?: Maybe<AccountAccountPkeyDelete>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteByEmail?: Maybe<AccountAccountEmailKeyDelete>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteById?: Maybe<AccountNodeIdDelete>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateByAccountId?: Maybe<AccountOnAnnotationForAnnotationAccountIdFkeyUsingAccountPkeyUpdate>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateByEmail?: Maybe<AccountOnAnnotationForAnnotationAccountIdFkeyUsingAccountEmailKeyUpdate>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateById?: Maybe<AnnotationOnAnnotationForAnnotationAccountIdFkeyNodeIdUpdate>;
  /** A `AccountInput` object that will be created and connected to this object. */
  create?: Maybe<AnnotationAccountIdFkeyAccountCreateInput>;
};

/** The fields on `account` to look up the row to connect. */
export type AccountAccountPkeyConnect = {
  accountId: Scalars['UUID'];
};

/** The fields on `account` to look up the row to connect. */
export type AccountAccountEmailKeyConnect = {
  email: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type AccountNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `account` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `account` to look up the row to delete. */
export type AccountAccountPkeyDelete = {
  accountId: Scalars['UUID'];
};

/** The fields on `account` to look up the row to delete. */
export type AccountAccountEmailKeyDelete = {
  email: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type AccountNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `account` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `account` to look up the row to update. */
export type AccountOnAnnotationForAnnotationAccountIdFkeyUsingAccountPkeyUpdate = {
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: UpdateAccountOnAnnotationForAnnotationAccountIdFkeyPatch;
  accountId: Scalars['UUID'];
};

/** An object where the defined keys will be set on the `account` being updated. */
export type UpdateAccountOnAnnotationForAnnotationAccountIdFkeyPatch = {
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** Input for the nested mutation of `accountPublication` in the `AccountInput` mutation. */
export type AccountPublicationAccountIdFkeyInverseInput = {
  /** Flag indicating whether all other `accountPublication` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  connectByAccountIdAndPublicationId?: Maybe<Array<AccountPublicationAccountPublicationPkeyConnect>>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  connectById?: Maybe<Array<AccountPublicationNodeIdConnect>>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  deleteByAccountIdAndPublicationId?: Maybe<Array<AccountPublicationAccountPublicationPkeyDelete>>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  deleteById?: Maybe<Array<AccountPublicationNodeIdDelete>>;
  /** The primary key(s) and patch data for `accountPublication` for the far side of the relationship. */
  updateByAccountIdAndPublicationId?: Maybe<Array<AccountPublicationOnAccountPublicationForAccountPublicationAccountIdFkeyUsingAccountPublicationPkeyUpdate>>;
  /** The primary key(s) and patch data for `accountPublication` for the far side of the relationship. */
  updateById?: Maybe<Array<AccountOnAccountPublicationForAccountPublicationAccountIdFkeyNodeIdUpdate>>;
  /** A `AccountPublicationInput` object that will be created and connected to this object. */
  create?: Maybe<Array<AccountPublicationAccountIdFkeyAccountPublicationCreateInput>>;
};

/** The fields on `accountPublication` to look up the row to connect. */
export type AccountPublicationAccountPublicationPkeyConnect = {
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type AccountPublicationNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `accountPublication` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `accountPublication` to look up the row to delete. */
export type AccountPublicationAccountPublicationPkeyDelete = {
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type AccountPublicationNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `accountPublication` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `accountPublication` to look up the row to update. */
export type AccountPublicationOnAccountPublicationForAccountPublicationAccountIdFkeyUsingAccountPublicationPkeyUpdate = {
  /** An object where the defined keys will be set on the `accountPublication` being updated. */
  accountPublicationPatch: UpdateAccountPublicationOnAccountPublicationForAccountPublicationAccountIdFkeyPatch;
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `accountPublication` being updated. */
export type UpdateAccountPublicationOnAccountPublicationForAccountPublicationAccountIdFkeyPatch = {
  publicationId?: Maybe<Scalars['String']>;
  accountToAccountId?: Maybe<AccountPublicationAccountIdFkeyInput>;
  publicationToPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInput>;
};

/** Input for the nested mutation of `account` in the `AccountPublicationInput` mutation. */
export type AccountPublicationAccountIdFkeyInput = {
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectByAccountId?: Maybe<AccountAccountPkeyConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectByEmail?: Maybe<AccountAccountEmailKeyConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectById?: Maybe<AccountNodeIdConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteByAccountId?: Maybe<AccountAccountPkeyDelete>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteByEmail?: Maybe<AccountAccountEmailKeyDelete>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteById?: Maybe<AccountNodeIdDelete>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateByAccountId?: Maybe<AccountOnAccountPublicationForAccountPublicationAccountIdFkeyUsingAccountPkeyUpdate>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateByEmail?: Maybe<AccountOnAccountPublicationForAccountPublicationAccountIdFkeyUsingAccountEmailKeyUpdate>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateById?: Maybe<AccountPublicationOnAccountPublicationForAccountPublicationAccountIdFkeyNodeIdUpdate>;
  /** A `AccountInput` object that will be created and connected to this object. */
  create?: Maybe<AccountPublicationAccountIdFkeyAccountCreateInput>;
};

/** The fields on `account` to look up the row to update. */
export type AccountOnAccountPublicationForAccountPublicationAccountIdFkeyUsingAccountPkeyUpdate = {
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: UpdateAccountOnAccountPublicationForAccountPublicationAccountIdFkeyPatch;
  accountId: Scalars['UUID'];
};

/** An object where the defined keys will be set on the `account` being updated. */
export type UpdateAccountOnAccountPublicationForAccountPublicationAccountIdFkeyPatch = {
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** Input for the nested mutation of `tag` in the `AccountInput` mutation. */
export type TagAccountIdFkeyInverseInput = {
  /** Flag indicating whether all other `tag` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  connectByTagId?: Maybe<Array<TagTagPkeyConnect>>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  connectById?: Maybe<Array<TagNodeIdConnect>>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  deleteByTagId?: Maybe<Array<TagTagPkeyDelete>>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  deleteById?: Maybe<Array<TagNodeIdDelete>>;
  /** The primary key(s) and patch data for `tag` for the far side of the relationship. */
  updateByTagId?: Maybe<Array<TagOnTagForTagAccountIdFkeyUsingTagPkeyUpdate>>;
  /** The primary key(s) and patch data for `tag` for the far side of the relationship. */
  updateById?: Maybe<Array<AccountOnTagForTagAccountIdFkeyNodeIdUpdate>>;
  /** A `TagInput` object that will be created and connected to this object. */
  create?: Maybe<Array<TagAccountIdFkeyTagCreateInput>>;
};

/** The fields on `tag` to look up the row to connect. */
export type TagTagPkeyConnect = {
  tagId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type TagNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `tag` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `tag` to look up the row to delete. */
export type TagTagPkeyDelete = {
  tagId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type TagNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `tag` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `tag` to look up the row to update. */
export type TagOnTagForTagAccountIdFkeyUsingTagPkeyUpdate = {
  /** An object where the defined keys will be set on the `tag` being updated. */
  tagPatch: UpdateTagOnTagForTagAccountIdFkeyPatch;
  tagId: Scalars['String'];
};

/** An object where the defined keys will be set on the `tag` being updated. */
export type UpdateTagOnTagForTagAccountIdFkeyPatch = {
  tagId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accountToAccountId?: Maybe<TagAccountIdFkeyInput>;
  annotationTagsUsingTagId?: Maybe<AnnotationTagTagIdFkeyInverseInput>;
};

/** Input for the nested mutation of `account` in the `TagInput` mutation. */
export type TagAccountIdFkeyInput = {
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectByAccountId?: Maybe<AccountAccountPkeyConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectByEmail?: Maybe<AccountAccountEmailKeyConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  connectById?: Maybe<AccountNodeIdConnect>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteByAccountId?: Maybe<AccountAccountPkeyDelete>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteByEmail?: Maybe<AccountAccountEmailKeyDelete>;
  /** The primary key(s) for `account` for the far side of the relationship. */
  deleteById?: Maybe<AccountNodeIdDelete>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateByAccountId?: Maybe<AccountOnTagForTagAccountIdFkeyUsingAccountPkeyUpdate>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateByEmail?: Maybe<AccountOnTagForTagAccountIdFkeyUsingAccountEmailKeyUpdate>;
  /** The primary key(s) and patch data for `account` for the far side of the relationship. */
  updateById?: Maybe<TagOnTagForTagAccountIdFkeyNodeIdUpdate>;
  /** A `AccountInput` object that will be created and connected to this object. */
  create?: Maybe<TagAccountIdFkeyAccountCreateInput>;
};

/** The fields on `account` to look up the row to update. */
export type AccountOnTagForTagAccountIdFkeyUsingAccountPkeyUpdate = {
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: UpdateAccountOnTagForTagAccountIdFkeyPatch;
  accountId: Scalars['UUID'];
};

/** An object where the defined keys will be set on the `account` being updated. */
export type UpdateAccountOnTagForTagAccountIdFkeyPatch = {
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** The fields on `account` to look up the row to update. */
export type AccountOnTagForTagAccountIdFkeyUsingAccountEmailKeyUpdate = {
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: UpdateAccountOnTagForTagAccountIdFkeyPatch;
  email: Scalars['String'];
};

/** The globally unique `ID` look up for the row to update. */
export type TagOnTagForTagAccountIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `account` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: AccountPatch;
};

/** Represents an update to a `Account`. Fields that are set will be updated. */
export type AccountPatch = {
  accountId?: Maybe<Scalars['UUID']>;
  email?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** The `account` to be created by this mutation. */
export type TagAccountIdFkeyAccountCreateInput = {
  email: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** Input for the nested mutation of `annotationTag` in the `TagInput` mutation. */
export type AnnotationTagTagIdFkeyInverseInput = {
  /** Flag indicating whether all other `annotationTag` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  connectByAnnotationIdAndTagId?: Maybe<Array<AnnotationTagAnnotationTagPkeyConnect>>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  connectById?: Maybe<Array<AnnotationTagNodeIdConnect>>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  deleteByAnnotationIdAndTagId?: Maybe<Array<AnnotationTagAnnotationTagPkeyDelete>>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  deleteById?: Maybe<Array<AnnotationTagNodeIdDelete>>;
  /** The primary key(s) and patch data for `annotationTag` for the far side of the relationship. */
  updateByAnnotationIdAndTagId?: Maybe<Array<AnnotationTagOnAnnotationTagForAnnotationTagTagIdFkeyUsingAnnotationTagPkeyUpdate>>;
  /** The primary key(s) and patch data for `annotationTag` for the far side of the relationship. */
  updateById?: Maybe<Array<TagOnAnnotationTagForAnnotationTagTagIdFkeyNodeIdUpdate>>;
  /** A `AnnotationTagInput` object that will be created and connected to this object. */
  create?: Maybe<Array<AnnotationTagTagIdFkeyAnnotationTagCreateInput>>;
};

/** The fields on `annotationTag` to look up the row to connect. */
export type AnnotationTagAnnotationTagPkeyConnect = {
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type AnnotationTagNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `annotationTag` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `annotationTag` to look up the row to delete. */
export type AnnotationTagAnnotationTagPkeyDelete = {
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type AnnotationTagNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `annotationTag` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `annotationTag` to look up the row to update. */
export type AnnotationTagOnAnnotationTagForAnnotationTagTagIdFkeyUsingAnnotationTagPkeyUpdate = {
  /** An object where the defined keys will be set on the `annotationTag` being updated. */
  annotationTagPatch: UpdateAnnotationTagOnAnnotationTagForAnnotationTagTagIdFkeyPatch;
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};

/** An object where the defined keys will be set on the `annotationTag` being updated. */
export type UpdateAnnotationTagOnAnnotationTagForAnnotationTagTagIdFkeyPatch = {
  annotationId?: Maybe<Scalars['String']>;
  annotationToAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInput>;
  tagToTagId?: Maybe<AnnotationTagTagIdFkeyInput>;
};

/** Input for the nested mutation of `annotation` in the `AnnotationTagInput` mutation. */
export type AnnotationTagAnnotationIdFkeyInput = {
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  connectByAnnotationId?: Maybe<AnnotationAnnotationPkeyConnect>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  connectById?: Maybe<AnnotationNodeIdConnect>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  deleteByAnnotationId?: Maybe<AnnotationAnnotationPkeyDelete>;
  /** The primary key(s) for `annotation` for the far side of the relationship. */
  deleteById?: Maybe<AnnotationNodeIdDelete>;
  /** The primary key(s) and patch data for `annotation` for the far side of the relationship. */
  updateByAnnotationId?: Maybe<AnnotationOnAnnotationTagForAnnotationTagAnnotationIdFkeyUsingAnnotationPkeyUpdate>;
  /** The primary key(s) and patch data for `annotation` for the far side of the relationship. */
  updateById?: Maybe<AnnotationTagOnAnnotationTagForAnnotationTagAnnotationIdFkeyNodeIdUpdate>;
  /** A `AnnotationInput` object that will be created and connected to this object. */
  create?: Maybe<AnnotationTagAnnotationIdFkeyAnnotationCreateInput>;
};

/** The fields on `annotation` to look up the row to update. */
export type AnnotationOnAnnotationTagForAnnotationTagAnnotationIdFkeyUsingAnnotationPkeyUpdate = {
  /** An object where the defined keys will be set on the `annotation` being updated. */
  annotationPatch: UpdateAnnotationOnAnnotationTagForAnnotationTagAnnotationIdFkeyPatch;
  annotationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `annotation` being updated. */
export type UpdateAnnotationOnAnnotationTagForAnnotationTagAnnotationIdFkeyPatch = {
  publicationId?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `annotationTag` in the `AnnotationInput` mutation. */
export type AnnotationTagAnnotationIdFkeyInverseInput = {
  /** Flag indicating whether all other `annotationTag` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  connectByAnnotationIdAndTagId?: Maybe<Array<AnnotationTagAnnotationTagPkeyConnect>>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  connectById?: Maybe<Array<AnnotationTagNodeIdConnect>>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  deleteByAnnotationIdAndTagId?: Maybe<Array<AnnotationTagAnnotationTagPkeyDelete>>;
  /** The primary key(s) for `annotationTag` for the far side of the relationship. */
  deleteById?: Maybe<Array<AnnotationTagNodeIdDelete>>;
  /** The primary key(s) and patch data for `annotationTag` for the far side of the relationship. */
  updateByAnnotationIdAndTagId?: Maybe<Array<AnnotationTagOnAnnotationTagForAnnotationTagAnnotationIdFkeyUsingAnnotationTagPkeyUpdate>>;
  /** The primary key(s) and patch data for `annotationTag` for the far side of the relationship. */
  updateById?: Maybe<Array<AnnotationOnAnnotationTagForAnnotationTagAnnotationIdFkeyNodeIdUpdate>>;
  /** A `AnnotationTagInput` object that will be created and connected to this object. */
  create?: Maybe<Array<AnnotationTagAnnotationIdFkeyAnnotationTagCreateInput>>;
};

/** The fields on `annotationTag` to look up the row to update. */
export type AnnotationTagOnAnnotationTagForAnnotationTagAnnotationIdFkeyUsingAnnotationTagPkeyUpdate = {
  /** An object where the defined keys will be set on the `annotationTag` being updated. */
  annotationTagPatch: UpdateAnnotationTagOnAnnotationTagForAnnotationTagAnnotationIdFkeyPatch;
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};

/** An object where the defined keys will be set on the `annotationTag` being updated. */
export type UpdateAnnotationTagOnAnnotationTagForAnnotationTagAnnotationIdFkeyPatch = {
  tagId?: Maybe<Scalars['String']>;
  annotationToAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInput>;
  tagToTagId?: Maybe<AnnotationTagTagIdFkeyInput>;
};

/** Input for the nested mutation of `tag` in the `AnnotationTagInput` mutation. */
export type AnnotationTagTagIdFkeyInput = {
  /** The primary key(s) for `tag` for the far side of the relationship. */
  connectByTagId?: Maybe<TagTagPkeyConnect>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  connectById?: Maybe<TagNodeIdConnect>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  deleteByTagId?: Maybe<TagTagPkeyDelete>;
  /** The primary key(s) for `tag` for the far side of the relationship. */
  deleteById?: Maybe<TagNodeIdDelete>;
  /** The primary key(s) and patch data for `tag` for the far side of the relationship. */
  updateByTagId?: Maybe<TagOnAnnotationTagForAnnotationTagTagIdFkeyUsingTagPkeyUpdate>;
  /** The primary key(s) and patch data for `tag` for the far side of the relationship. */
  updateById?: Maybe<AnnotationTagOnAnnotationTagForAnnotationTagTagIdFkeyNodeIdUpdate>;
  /** A `TagInput` object that will be created and connected to this object. */
  create?: Maybe<AnnotationTagTagIdFkeyTagCreateInput>;
};

/** The fields on `tag` to look up the row to update. */
export type TagOnAnnotationTagForAnnotationTagTagIdFkeyUsingTagPkeyUpdate = {
  /** An object where the defined keys will be set on the `tag` being updated. */
  tagPatch: UpdateTagOnAnnotationTagForAnnotationTagTagIdFkeyPatch;
  tagId: Scalars['String'];
};

/** An object where the defined keys will be set on the `tag` being updated. */
export type UpdateTagOnAnnotationTagForAnnotationTagTagIdFkeyPatch = {
  name?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  accountToAccountId?: Maybe<TagAccountIdFkeyInput>;
  annotationTagsUsingTagId?: Maybe<AnnotationTagTagIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AnnotationTagOnAnnotationTagForAnnotationTagTagIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `tag` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `tag` being updated. */
  tagPatch: TagPatch;
};

/** Represents an update to a `Tag`. Fields that are set will be updated. */
export type TagPatch = {
  tagId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  accountToAccountId?: Maybe<TagAccountIdFkeyInput>;
  annotationTagsUsingTagId?: Maybe<AnnotationTagTagIdFkeyInverseInput>;
};

/** The `tag` to be created by this mutation. */
export type AnnotationTagTagIdFkeyTagCreateInput = {
  name: Scalars['String'];
  accountId?: Maybe<Scalars['UUID']>;
  accountToAccountId?: Maybe<TagAccountIdFkeyInput>;
  annotationTagsUsingTagId?: Maybe<AnnotationTagTagIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AnnotationOnAnnotationTagForAnnotationTagAnnotationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `annotationTag` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `annotationTag` being updated. */
  annotationTagPatch: AnnotationTagPatch;
};

/** Represents an update to a `AnnotationTag`. Fields that are set will be updated. */
export type AnnotationTagPatch = {
  annotationId?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
  annotationToAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInput>;
  tagToTagId?: Maybe<AnnotationTagTagIdFkeyInput>;
};

/** The `annotationTag` to be created by this mutation. */
export type AnnotationTagAnnotationIdFkeyAnnotationTagCreateInput = {
  tagId?: Maybe<Scalars['String']>;
  annotationToAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInput>;
  tagToTagId?: Maybe<AnnotationTagTagIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AnnotationTagOnAnnotationTagForAnnotationTagAnnotationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `annotation` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `annotation` being updated. */
  annotationPatch: AnnotationPatch;
};

/** Represents an update to a `Annotation`. Fields that are set will be updated. */
export type AnnotationPatch = {
  annotationId?: Maybe<Scalars['String']>;
  publicationId?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** The `annotation` to be created by this mutation. */
export type AnnotationTagAnnotationIdFkeyAnnotationCreateInput = {
  publicationId?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type TagOnAnnotationTagForAnnotationTagTagIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `annotationTag` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `annotationTag` being updated. */
  annotationTagPatch: AnnotationTagPatch;
};

/** The `annotationTag` to be created by this mutation. */
export type AnnotationTagTagIdFkeyAnnotationTagCreateInput = {
  annotationId?: Maybe<Scalars['String']>;
  annotationToAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInput>;
  tagToTagId?: Maybe<AnnotationTagTagIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AccountOnTagForTagAccountIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `tag` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `tag` being updated. */
  tagPatch: TagPatch;
};

/** The `tag` to be created by this mutation. */
export type TagAccountIdFkeyTagCreateInput = {
  tagId: Scalars['String'];
  name: Scalars['String'];
  accountToAccountId?: Maybe<TagAccountIdFkeyInput>;
  annotationTagsUsingTagId?: Maybe<AnnotationTagTagIdFkeyInverseInput>;
};

/** The fields on `account` to look up the row to update. */
export type AccountOnAccountPublicationForAccountPublicationAccountIdFkeyUsingAccountEmailKeyUpdate = {
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: UpdateAccountOnAccountPublicationForAccountPublicationAccountIdFkeyPatch;
  email: Scalars['String'];
};

/** The globally unique `ID` look up for the row to update. */
export type AccountPublicationOnAccountPublicationForAccountPublicationAccountIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `account` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: AccountPatch;
};

/** The `account` to be created by this mutation. */
export type AccountPublicationAccountIdFkeyAccountCreateInput = {
  email: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** Input for the nested mutation of `publication` in the `AccountPublicationInput` mutation. */
export type AccountPublicationPublicationIdFkeyInput = {
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectByPublicationId?: Maybe<PublicationPublicationPkeyConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectById?: Maybe<PublicationNodeIdConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteByPublicationId?: Maybe<PublicationPublicationPkeyDelete>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteById?: Maybe<PublicationNodeIdDelete>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateByPublicationId?: Maybe<PublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyUsingPublicationPkeyUpdate>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateById?: Maybe<AccountPublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyNodeIdUpdate>;
  /** A `PublicationInput` object that will be created and connected to this object. */
  create?: Maybe<AccountPublicationPublicationIdFkeyPublicationCreateInput>;
};

/** The fields on `publication` to look up the row to update. */
export type PublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyUsingPublicationPkeyUpdate = {
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: UpdatePublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyPatch;
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `publication` being updated. */
export type UpdatePublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `publicationAuthor` in the `PublicationInput` mutation. */
export type PublicationAuthorPublicationIdFkeyInverseInput = {
  /** Flag indicating whether all other `publicationAuthor` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  connectByPublicationIdAndAuthorId?: Maybe<Array<PublicationAuthorPublicationAuthorPkeyConnect>>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  connectById?: Maybe<Array<PublicationAuthorNodeIdConnect>>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  deleteByPublicationIdAndAuthorId?: Maybe<Array<PublicationAuthorPublicationAuthorPkeyDelete>>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  deleteById?: Maybe<Array<PublicationAuthorNodeIdDelete>>;
  /** The primary key(s) and patch data for `publicationAuthor` for the far side of the relationship. */
  updateByPublicationIdAndAuthorId?: Maybe<Array<PublicationAuthorOnPublicationAuthorForPublicationAuthorPublicationIdFkeyUsingPublicationAuthorPkeyUpdate>>;
  /** The primary key(s) and patch data for `publicationAuthor` for the far side of the relationship. */
  updateById?: Maybe<Array<PublicationOnPublicationAuthorForPublicationAuthorPublicationIdFkeyNodeIdUpdate>>;
  /** A `PublicationAuthorInput` object that will be created and connected to this object. */
  create?: Maybe<Array<PublicationAuthorPublicationIdFkeyPublicationAuthorCreateInput>>;
};

/** The fields on `publicationAuthor` to look up the row to connect. */
export type PublicationAuthorPublicationAuthorPkeyConnect = {
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type PublicationAuthorNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `publicationAuthor` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `publicationAuthor` to look up the row to delete. */
export type PublicationAuthorPublicationAuthorPkeyDelete = {
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type PublicationAuthorNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `publicationAuthor` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `publicationAuthor` to look up the row to update. */
export type PublicationAuthorOnPublicationAuthorForPublicationAuthorPublicationIdFkeyUsingPublicationAuthorPkeyUpdate = {
  /** An object where the defined keys will be set on the `publicationAuthor` being updated. */
  publicationAuthorPatch: UpdatePublicationAuthorOnPublicationAuthorForPublicationAuthorPublicationIdFkeyPatch;
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};

/** An object where the defined keys will be set on the `publicationAuthor` being updated. */
export type UpdatePublicationAuthorOnPublicationAuthorForPublicationAuthorPublicationIdFkeyPatch = {
  authorId?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInput>;
  authorToAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInput>;
};

/** Input for the nested mutation of `publication` in the `PublicationAuthorInput` mutation. */
export type PublicationAuthorPublicationIdFkeyInput = {
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectByPublicationId?: Maybe<PublicationPublicationPkeyConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  connectById?: Maybe<PublicationNodeIdConnect>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteByPublicationId?: Maybe<PublicationPublicationPkeyDelete>;
  /** The primary key(s) for `publication` for the far side of the relationship. */
  deleteById?: Maybe<PublicationNodeIdDelete>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateByPublicationId?: Maybe<PublicationOnPublicationAuthorForPublicationAuthorPublicationIdFkeyUsingPublicationPkeyUpdate>;
  /** The primary key(s) and patch data for `publication` for the far side of the relationship. */
  updateById?: Maybe<PublicationAuthorOnPublicationAuthorForPublicationAuthorPublicationIdFkeyNodeIdUpdate>;
  /** A `PublicationInput` object that will be created and connected to this object. */
  create?: Maybe<PublicationAuthorPublicationIdFkeyPublicationCreateInput>;
};

/** The fields on `publication` to look up the row to update. */
export type PublicationOnPublicationAuthorForPublicationAuthorPublicationIdFkeyUsingPublicationPkeyUpdate = {
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: UpdatePublicationOnPublicationAuthorForPublicationAuthorPublicationIdFkeyPatch;
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `publication` being updated. */
export type UpdatePublicationOnPublicationAuthorForPublicationAuthorPublicationIdFkeyPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `accountPublication` in the `PublicationInput` mutation. */
export type AccountPublicationPublicationIdFkeyInverseInput = {
  /** Flag indicating whether all other `accountPublication` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  connectByAccountIdAndPublicationId?: Maybe<Array<AccountPublicationAccountPublicationPkeyConnect>>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  connectById?: Maybe<Array<AccountPublicationNodeIdConnect>>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  deleteByAccountIdAndPublicationId?: Maybe<Array<AccountPublicationAccountPublicationPkeyDelete>>;
  /** The primary key(s) for `accountPublication` for the far side of the relationship. */
  deleteById?: Maybe<Array<AccountPublicationNodeIdDelete>>;
  /** The primary key(s) and patch data for `accountPublication` for the far side of the relationship. */
  updateByAccountIdAndPublicationId?: Maybe<Array<AccountPublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyUsingAccountPublicationPkeyUpdate>>;
  /** The primary key(s) and patch data for `accountPublication` for the far side of the relationship. */
  updateById?: Maybe<Array<PublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyNodeIdUpdate>>;
  /** A `AccountPublicationInput` object that will be created and connected to this object. */
  create?: Maybe<Array<AccountPublicationPublicationIdFkeyAccountPublicationCreateInput>>;
};

/** The fields on `accountPublication` to look up the row to update. */
export type AccountPublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyUsingAccountPublicationPkeyUpdate = {
  /** An object where the defined keys will be set on the `accountPublication` being updated. */
  accountPublicationPatch: UpdateAccountPublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyPatch;
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};

/** An object where the defined keys will be set on the `accountPublication` being updated. */
export type UpdateAccountPublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyPatch = {
  accountId?: Maybe<Scalars['UUID']>;
  accountToAccountId?: Maybe<AccountPublicationAccountIdFkeyInput>;
  publicationToPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type PublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `accountPublication` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `accountPublication` being updated. */
  accountPublicationPatch: AccountPublicationPatch;
};

/** Represents an update to a `AccountPublication`. Fields that are set will be updated. */
export type AccountPublicationPatch = {
  accountId?: Maybe<Scalars['UUID']>;
  publicationId?: Maybe<Scalars['String']>;
  accountToAccountId?: Maybe<AccountPublicationAccountIdFkeyInput>;
  publicationToPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInput>;
};

/** The `accountPublication` to be created by this mutation. */
export type AccountPublicationPublicationIdFkeyAccountPublicationCreateInput = {
  accountId?: Maybe<Scalars['UUID']>;
  accountToAccountId?: Maybe<AccountPublicationAccountIdFkeyInput>;
  publicationToPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type PublicationAuthorOnPublicationAuthorForPublicationAuthorPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `publication` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: PublicationPatch;
};

/** Represents an update to a `Publication`. Fields that are set will be updated. */
export type PublicationPatch = {
  publicationId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** The `publication` to be created by this mutation. */
export type PublicationAuthorPublicationIdFkeyPublicationCreateInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** Input for the nested mutation of `author` in the `PublicationAuthorInput` mutation. */
export type PublicationAuthorAuthorIdFkeyInput = {
  /** The primary key(s) for `author` for the far side of the relationship. */
  connectByAuthorId?: Maybe<AuthorAuthorPkeyConnect>;
  /** The primary key(s) for `author` for the far side of the relationship. */
  connectById?: Maybe<AuthorNodeIdConnect>;
  /** The primary key(s) for `author` for the far side of the relationship. */
  deleteByAuthorId?: Maybe<AuthorAuthorPkeyDelete>;
  /** The primary key(s) for `author` for the far side of the relationship. */
  deleteById?: Maybe<AuthorNodeIdDelete>;
  /** The primary key(s) and patch data for `author` for the far side of the relationship. */
  updateByAuthorId?: Maybe<AuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyUsingAuthorPkeyUpdate>;
  /** The primary key(s) and patch data for `author` for the far side of the relationship. */
  updateById?: Maybe<PublicationAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyNodeIdUpdate>;
  /** A `AuthorInput` object that will be created and connected to this object. */
  create?: Maybe<PublicationAuthorAuthorIdFkeyAuthorCreateInput>;
};

/** The fields on `author` to look up the row to connect. */
export type AuthorAuthorPkeyConnect = {
  authorId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to connect. */
export type AuthorNodeIdConnect = {
  /** The globally unique `ID` which identifies a single `author` to be connected. */
  id: Scalars['ID'];
};

/** The fields on `author` to look up the row to delete. */
export type AuthorAuthorPkeyDelete = {
  authorId: Scalars['String'];
};

/** The globally unique `ID` look up for the row to delete. */
export type AuthorNodeIdDelete = {
  /** The globally unique `ID` which identifies a single `author` to be deleted. */
  id: Scalars['ID'];
};

/** The fields on `author` to look up the row to update. */
export type AuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyUsingAuthorPkeyUpdate = {
  /** An object where the defined keys will be set on the `author` being updated. */
  authorPatch: UpdateAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyPatch;
  authorId: Scalars['String'];
};

/** An object where the defined keys will be set on the `author` being updated. */
export type UpdateAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyPatch = {
  name?: Maybe<Scalars['String']>;
  publicationAuthorsUsingAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInverseInput>;
};

/** Input for the nested mutation of `publicationAuthor` in the `AuthorInput` mutation. */
export type PublicationAuthorAuthorIdFkeyInverseInput = {
  /** Flag indicating whether all other `publicationAuthor` records that match this relationship should be removed. */
  deleteOthers?: Maybe<Scalars['Boolean']>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  connectByPublicationIdAndAuthorId?: Maybe<Array<PublicationAuthorPublicationAuthorPkeyConnect>>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  connectById?: Maybe<Array<PublicationAuthorNodeIdConnect>>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  deleteByPublicationIdAndAuthorId?: Maybe<Array<PublicationAuthorPublicationAuthorPkeyDelete>>;
  /** The primary key(s) for `publicationAuthor` for the far side of the relationship. */
  deleteById?: Maybe<Array<PublicationAuthorNodeIdDelete>>;
  /** The primary key(s) and patch data for `publicationAuthor` for the far side of the relationship. */
  updateByPublicationIdAndAuthorId?: Maybe<Array<PublicationAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyUsingPublicationAuthorPkeyUpdate>>;
  /** The primary key(s) and patch data for `publicationAuthor` for the far side of the relationship. */
  updateById?: Maybe<Array<AuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyNodeIdUpdate>>;
  /** A `PublicationAuthorInput` object that will be created and connected to this object. */
  create?: Maybe<Array<PublicationAuthorAuthorIdFkeyPublicationAuthorCreateInput>>;
};

/** The fields on `publicationAuthor` to look up the row to update. */
export type PublicationAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyUsingPublicationAuthorPkeyUpdate = {
  /** An object where the defined keys will be set on the `publicationAuthor` being updated. */
  publicationAuthorPatch: UpdatePublicationAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyPatch;
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};

/** An object where the defined keys will be set on the `publicationAuthor` being updated. */
export type UpdatePublicationAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyPatch = {
  publicationId?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInput>;
  authorToAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `publicationAuthor` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `publicationAuthor` being updated. */
  publicationAuthorPatch: PublicationAuthorPatch;
};

/** Represents an update to a `PublicationAuthor`. Fields that are set will be updated. */
export type PublicationAuthorPatch = {
  publicationId?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInput>;
  authorToAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInput>;
};

/** The `publicationAuthor` to be created by this mutation. */
export type PublicationAuthorAuthorIdFkeyPublicationAuthorCreateInput = {
  publicationId?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInput>;
  authorToAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type PublicationAuthorOnPublicationAuthorForPublicationAuthorAuthorIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `author` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `author` being updated. */
  authorPatch: AuthorPatch;
};

/** Represents an update to a `Author`. Fields that are set will be updated. */
export type AuthorPatch = {
  authorId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  publicationAuthorsUsingAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInverseInput>;
};

/** The `author` to be created by this mutation. */
export type PublicationAuthorAuthorIdFkeyAuthorCreateInput = {
  name?: Maybe<Scalars['String']>;
  publicationAuthorsUsingAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type PublicationOnPublicationAuthorForPublicationAuthorPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `publicationAuthor` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `publicationAuthor` being updated. */
  publicationAuthorPatch: PublicationAuthorPatch;
};

/** The `publicationAuthor` to be created by this mutation. */
export type PublicationAuthorPublicationIdFkeyPublicationAuthorCreateInput = {
  authorId?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInput>;
  authorToAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AccountPublicationOnAccountPublicationForAccountPublicationPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `publication` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: PublicationPatch;
};

/** The `publication` to be created by this mutation. */
export type AccountPublicationPublicationIdFkeyPublicationCreateInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AccountOnAccountPublicationForAccountPublicationAccountIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `accountPublication` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `accountPublication` being updated. */
  accountPublicationPatch: AccountPublicationPatch;
};

/** The `accountPublication` to be created by this mutation. */
export type AccountPublicationAccountIdFkeyAccountPublicationCreateInput = {
  publicationId?: Maybe<Scalars['String']>;
  accountToAccountId?: Maybe<AccountPublicationAccountIdFkeyInput>;
  publicationToPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInput>;
};

/** The fields on `account` to look up the row to update. */
export type AccountOnAnnotationForAnnotationAccountIdFkeyUsingAccountEmailKeyUpdate = {
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: UpdateAccountOnAnnotationForAnnotationAccountIdFkeyPatch;
  email: Scalars['String'];
};

/** The globally unique `ID` look up for the row to update. */
export type AnnotationOnAnnotationForAnnotationAccountIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `account` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `account` being updated. */
  accountPatch: AccountPatch;
};

/** The `account` to be created by this mutation. */
export type AnnotationAccountIdFkeyAccountCreateInput = {
  email: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  status?: Maybe<Scalars['String']>;
  emailVerified?: Maybe<Scalars['Boolean']>;
  group?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  annotationsUsingAccountId?: Maybe<AnnotationAccountIdFkeyInverseInput>;
  accountPublicationsUsingAccountId?: Maybe<AccountPublicationAccountIdFkeyInverseInput>;
  tagsUsingAccountId?: Maybe<TagAccountIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type PublicationOnAnnotationForAnnotationPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `annotation` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `annotation` being updated. */
  annotationPatch: AnnotationPatch;
};

/** The `annotation` to be created by this mutation. */
export type AnnotationPublicationIdFkeyAnnotationCreateInput = {
  annotationId: Scalars['String'];
  accountId?: Maybe<Scalars['UUID']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type BookOnBookForBookPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `publication` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: PublicationPatch;
};

/** The `publication` to be created by this mutation. */
export type BookPublicationIdFkeyPublicationCreateInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** The fields on `book` to look up the row to update. */
export type BookOnBookForBookPublicationIdFkeyUsingBookTitleKeyUpdate = {
  /** An object where the defined keys will be set on the `book` being updated. */
  bookPatch: UpdateBookOnBookForBookPublicationIdFkeyPatch;
  title: Scalars['String'];
};

/** The globally unique `ID` look up for the row to update. */
export type PublicationOnBookForBookPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `book` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `book` being updated. */
  bookPatch: BookPatch;
};

/** Represents an update to a `Book`. Fields that are set will be updated. */
export type BookPatch = {
  publicationId?: Maybe<Scalars['String']>;
  isbn13?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  languageCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  publicationDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  bookType?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<BookPublicationIdFkeyInput>;
};

/** The `book` to be created by this mutation. */
export type BookPublicationIdFkeyBookCreateInput = {
  isbn13?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  languageCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  publicationDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  bookType?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<BookPublicationIdFkeyInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AnnotationOnAnnotationForAnnotationPublicationIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `publication` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `publication` being updated. */
  publicationPatch: PublicationPatch;
};

/** The `publication` to be created by this mutation. */
export type AnnotationPublicationIdFkeyPublicationCreateInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** The globally unique `ID` look up for the row to update. */
export type AccountOnAnnotationForAnnotationAccountIdFkeyNodeIdUpdate = {
  /** The globally unique `ID` which identifies a single `annotation` to be connected. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `annotation` being updated. */
  annotationPatch: AnnotationPatch;
};

/** The `annotation` to be created by this mutation. */
export type AnnotationAccountIdFkeyAnnotationCreateInput = {
  annotationId: Scalars['String'];
  publicationId?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** The output of our create `Account` mutation. */
export type CreateAccountPayload = {
  __typename?: 'CreateAccountPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was created by this mutation. */
  account?: Maybe<Account>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our create `Account` mutation. */
export type CreateAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the create `AccountPublication` mutation. */
export type CreateAccountPublicationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountPublication` to be created by this mutation. */
  accountPublication: AccountPublicationInput;
};

/** An input for mutations affecting `AccountPublication` */
export type AccountPublicationInput = {
  accountId?: Maybe<Scalars['UUID']>;
  publicationId?: Maybe<Scalars['String']>;
  accountToAccountId?: Maybe<AccountPublicationAccountIdFkeyInput>;
  publicationToPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInput>;
};

/** The output of our create `AccountPublication` mutation. */
export type CreateAccountPublicationPayload = {
  __typename?: 'CreateAccountPublicationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountPublication` that was created by this mutation. */
  accountPublication?: Maybe<AccountPublication>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `AccountPublication`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Publication` that is related to this `AccountPublication`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** An edge for our `AccountPublication`. May be used by Relay 1. */
  accountPublicationEdge?: Maybe<AccountPublicationsEdge>;
};


/** The output of our create `AccountPublication` mutation. */
export type CreateAccountPublicationPayloadAccountPublicationEdgeArgs = {
  orderBy?: Maybe<Array<AccountPublicationsOrderBy>>;
};

/** All input for the create `Annotation` mutation. */
export type CreateAnnotationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Annotation` to be created by this mutation. */
  annotation: AnnotationInput;
};

/** An input for mutations affecting `Annotation` */
export type AnnotationInput = {
  annotationId: Scalars['String'];
  publicationId?: Maybe<Scalars['String']>;
  accountId?: Maybe<Scalars['UUID']>;
  color?: Maybe<Scalars['String']>;
  highlightLocation?: Maybe<Scalars['JSON']>;
  highlightedText?: Maybe<Scalars['String']>;
  noteText?: Maybe<Scalars['String']>;
  noteLocation?: Maybe<Scalars['JSON']>;
  recordedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  extraEdits?: Maybe<Scalars['JSON']>;
  publicationToPublicationId?: Maybe<AnnotationPublicationIdFkeyInput>;
  accountToAccountId?: Maybe<AnnotationAccountIdFkeyInput>;
  annotationTagsUsingAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInverseInput>;
};

/** The output of our create `Annotation` mutation. */
export type CreateAnnotationPayload = {
  __typename?: 'CreateAnnotationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Annotation` that was created by this mutation. */
  annotation?: Maybe<Annotation>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `Annotation`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Account` that is related to this `Annotation`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Annotation`. May be used by Relay 1. */
  annotationEdge?: Maybe<AnnotationsEdge>;
};


/** The output of our create `Annotation` mutation. */
export type CreateAnnotationPayloadAnnotationEdgeArgs = {
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
};

/** All input for the create `AnnotationTag` mutation. */
export type CreateAnnotationTagInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AnnotationTag` to be created by this mutation. */
  annotationTag: AnnotationTagInput;
};

/** An input for mutations affecting `AnnotationTag` */
export type AnnotationTagInput = {
  annotationId?: Maybe<Scalars['String']>;
  tagId?: Maybe<Scalars['String']>;
  annotationToAnnotationId?: Maybe<AnnotationTagAnnotationIdFkeyInput>;
  tagToTagId?: Maybe<AnnotationTagTagIdFkeyInput>;
};

/** The output of our create `AnnotationTag` mutation. */
export type CreateAnnotationTagPayload = {
  __typename?: 'CreateAnnotationTagPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AnnotationTag` that was created by this mutation. */
  annotationTag?: Maybe<AnnotationTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Annotation` that is related to this `AnnotationTag`. */
  annotationByAnnotationId?: Maybe<Annotation>;
  /** Reads a single `Tag` that is related to this `AnnotationTag`. */
  tagByTagId?: Maybe<Tag>;
  /** An edge for our `AnnotationTag`. May be used by Relay 1. */
  annotationTagEdge?: Maybe<AnnotationTagsEdge>;
};


/** The output of our create `AnnotationTag` mutation. */
export type CreateAnnotationTagPayloadAnnotationTagEdgeArgs = {
  orderBy?: Maybe<Array<AnnotationTagsOrderBy>>;
};

/** All input for the create `Author` mutation. */
export type CreateAuthorInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Author` to be created by this mutation. */
  author: AuthorInput;
};

/** An input for mutations affecting `Author` */
export type AuthorInput = {
  authorId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  publicationAuthorsUsingAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInverseInput>;
};

/** The output of our create `Author` mutation. */
export type CreateAuthorPayload = {
  __typename?: 'CreateAuthorPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Author` that was created by this mutation. */
  author?: Maybe<Author>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Author`. May be used by Relay 1. */
  authorEdge?: Maybe<AuthorsEdge>;
};


/** The output of our create `Author` mutation. */
export type CreateAuthorPayloadAuthorEdgeArgs = {
  orderBy?: Maybe<Array<AuthorsOrderBy>>;
};

/** All input for the create `Book` mutation. */
export type CreateBookInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Book` to be created by this mutation. */
  book: BookInput;
};

/** An input for mutations affecting `Book` */
export type BookInput = {
  publicationId?: Maybe<Scalars['String']>;
  isbn13?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  languageCode?: Maybe<Scalars['String']>;
  publisher?: Maybe<Scalars['String']>;
  publicationDate?: Maybe<Scalars['Date']>;
  description?: Maybe<Scalars['String']>;
  bookType?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<BookPublicationIdFkeyInput>;
};

/** The output of our create `Book` mutation. */
export type CreateBookPayload = {
  __typename?: 'CreateBookPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Book` that was created by this mutation. */
  book?: Maybe<Book>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `Book`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** An edge for our `Book`. May be used by Relay 1. */
  bookEdge?: Maybe<BooksEdge>;
};


/** The output of our create `Book` mutation. */
export type CreateBookPayloadBookEdgeArgs = {
  orderBy?: Maybe<Array<BooksOrderBy>>;
};

/** All input for the create `Publication` mutation. */
export type CreatePublicationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Publication` to be created by this mutation. */
  publication: PublicationInput;
};

/** An input for mutations affecting `Publication` */
export type PublicationInput = {
  publicationId: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  bookUsingPublicationId?: Maybe<BookPublicationIdFkeyInverseInput>;
  annotationsUsingPublicationId?: Maybe<AnnotationPublicationIdFkeyInverseInput>;
  publicationAuthorsUsingPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInverseInput>;
  accountPublicationsUsingPublicationId?: Maybe<AccountPublicationPublicationIdFkeyInverseInput>;
};

/** The output of our create `Publication` mutation. */
export type CreatePublicationPayload = {
  __typename?: 'CreatePublicationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Publication` that was created by this mutation. */
  publication?: Maybe<Publication>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Publication`. May be used by Relay 1. */
  publicationEdge?: Maybe<PublicationsEdge>;
};


/** The output of our create `Publication` mutation. */
export type CreatePublicationPayloadPublicationEdgeArgs = {
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
};

/** All input for the create `PublicationAuthor` mutation. */
export type CreatePublicationAuthorInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PublicationAuthor` to be created by this mutation. */
  publicationAuthor: PublicationAuthorInput;
};

/** An input for mutations affecting `PublicationAuthor` */
export type PublicationAuthorInput = {
  publicationId?: Maybe<Scalars['String']>;
  authorId?: Maybe<Scalars['String']>;
  publicationToPublicationId?: Maybe<PublicationAuthorPublicationIdFkeyInput>;
  authorToAuthorId?: Maybe<PublicationAuthorAuthorIdFkeyInput>;
};

/** The output of our create `PublicationAuthor` mutation. */
export type CreatePublicationAuthorPayload = {
  __typename?: 'CreatePublicationAuthorPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PublicationAuthor` that was created by this mutation. */
  publicationAuthor?: Maybe<PublicationAuthor>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `PublicationAuthor`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Author` that is related to this `PublicationAuthor`. */
  authorByAuthorId?: Maybe<Author>;
  /** An edge for our `PublicationAuthor`. May be used by Relay 1. */
  publicationAuthorEdge?: Maybe<PublicationAuthorsEdge>;
};


/** The output of our create `PublicationAuthor` mutation. */
export type CreatePublicationAuthorPayloadPublicationAuthorEdgeArgs = {
  orderBy?: Maybe<Array<PublicationAuthorsOrderBy>>;
};

/** All input for the create `Tag` mutation. */
export type CreateTagInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` to be created by this mutation. */
  tag: TagInput;
};

/** An input for mutations affecting `Tag` */
export type TagInput = {
  tagId: Scalars['String'];
  name: Scalars['String'];
  accountId?: Maybe<Scalars['UUID']>;
  accountToAccountId?: Maybe<TagAccountIdFkeyInput>;
  annotationTagsUsingTagId?: Maybe<AnnotationTagTagIdFkeyInverseInput>;
};

/** The output of our create `Tag` mutation. */
export type CreateTagPayload = {
  __typename?: 'CreateTagPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` that was created by this mutation. */
  tag?: Maybe<Tag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Tag`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>;
};


/** The output of our create `Tag` mutation. */
export type CreateTagPayloadTagEdgeArgs = {
  orderBy?: Maybe<Array<TagsOrderBy>>;
};

/** All input for the `updateAccount` mutation. */
export type UpdateAccountInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Account` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
};

/** The output of our update `Account` mutation. */
export type UpdateAccountPayload = {
  __typename?: 'UpdateAccountPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was updated by this mutation. */
  account?: Maybe<Account>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our update `Account` mutation. */
export type UpdateAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the `updateAccountByAccountId` mutation. */
export type UpdateAccountByAccountIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
  accountId: Scalars['UUID'];
};

/** All input for the `updateAccountByEmail` mutation. */
export type UpdateAccountByEmailInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Account` being updated. */
  accountPatch: AccountPatch;
  email: Scalars['String'];
};

/** All input for the `updateAccountPublication` mutation. */
export type UpdateAccountPublicationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AccountPublication` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `AccountPublication` being updated. */
  accountPublicationPatch: AccountPublicationPatch;
};

/** The output of our update `AccountPublication` mutation. */
export type UpdateAccountPublicationPayload = {
  __typename?: 'UpdateAccountPublicationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountPublication` that was updated by this mutation. */
  accountPublication?: Maybe<AccountPublication>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `AccountPublication`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Publication` that is related to this `AccountPublication`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** An edge for our `AccountPublication`. May be used by Relay 1. */
  accountPublicationEdge?: Maybe<AccountPublicationsEdge>;
};


/** The output of our update `AccountPublication` mutation. */
export type UpdateAccountPublicationPayloadAccountPublicationEdgeArgs = {
  orderBy?: Maybe<Array<AccountPublicationsOrderBy>>;
};

/** All input for the `updateAccountPublicationByAccountIdAndPublicationId` mutation. */
export type UpdateAccountPublicationByAccountIdAndPublicationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AccountPublication` being updated. */
  accountPublicationPatch: AccountPublicationPatch;
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};

/** All input for the `updateAnnotation` mutation. */
export type UpdateAnnotationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Annotation` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `Annotation` being updated. */
  annotationPatch: AnnotationPatch;
};

/** The output of our update `Annotation` mutation. */
export type UpdateAnnotationPayload = {
  __typename?: 'UpdateAnnotationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Annotation` that was updated by this mutation. */
  annotation?: Maybe<Annotation>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `Annotation`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Account` that is related to this `Annotation`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Annotation`. May be used by Relay 1. */
  annotationEdge?: Maybe<AnnotationsEdge>;
};


/** The output of our update `Annotation` mutation. */
export type UpdateAnnotationPayloadAnnotationEdgeArgs = {
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
};

/** All input for the `updateAnnotationByAnnotationId` mutation. */
export type UpdateAnnotationByAnnotationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Annotation` being updated. */
  annotationPatch: AnnotationPatch;
  annotationId: Scalars['String'];
};

/** All input for the `updateAnnotationTag` mutation. */
export type UpdateAnnotationTagInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AnnotationTag` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `AnnotationTag` being updated. */
  annotationTagPatch: AnnotationTagPatch;
};

/** The output of our update `AnnotationTag` mutation. */
export type UpdateAnnotationTagPayload = {
  __typename?: 'UpdateAnnotationTagPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AnnotationTag` that was updated by this mutation. */
  annotationTag?: Maybe<AnnotationTag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Annotation` that is related to this `AnnotationTag`. */
  annotationByAnnotationId?: Maybe<Annotation>;
  /** Reads a single `Tag` that is related to this `AnnotationTag`. */
  tagByTagId?: Maybe<Tag>;
  /** An edge for our `AnnotationTag`. May be used by Relay 1. */
  annotationTagEdge?: Maybe<AnnotationTagsEdge>;
};


/** The output of our update `AnnotationTag` mutation. */
export type UpdateAnnotationTagPayloadAnnotationTagEdgeArgs = {
  orderBy?: Maybe<Array<AnnotationTagsOrderBy>>;
};

/** All input for the `updateAnnotationTagByAnnotationIdAndTagId` mutation. */
export type UpdateAnnotationTagByAnnotationIdAndTagIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AnnotationTag` being updated. */
  annotationTagPatch: AnnotationTagPatch;
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};

/** All input for the `updateAuthor` mutation. */
export type UpdateAuthorInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Author` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `Author` being updated. */
  authorPatch: AuthorPatch;
};

/** The output of our update `Author` mutation. */
export type UpdateAuthorPayload = {
  __typename?: 'UpdateAuthorPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Author` that was updated by this mutation. */
  author?: Maybe<Author>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Author`. May be used by Relay 1. */
  authorEdge?: Maybe<AuthorsEdge>;
};


/** The output of our update `Author` mutation. */
export type UpdateAuthorPayloadAuthorEdgeArgs = {
  orderBy?: Maybe<Array<AuthorsOrderBy>>;
};

/** All input for the `updateAuthorByAuthorId` mutation. */
export type UpdateAuthorByAuthorIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Author` being updated. */
  authorPatch: AuthorPatch;
  authorId: Scalars['String'];
};

/** All input for the `updateBook` mutation. */
export type UpdateBookInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Book` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `Book` being updated. */
  bookPatch: BookPatch;
};

/** The output of our update `Book` mutation. */
export type UpdateBookPayload = {
  __typename?: 'UpdateBookPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Book` that was updated by this mutation. */
  book?: Maybe<Book>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `Book`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** An edge for our `Book`. May be used by Relay 1. */
  bookEdge?: Maybe<BooksEdge>;
};


/** The output of our update `Book` mutation. */
export type UpdateBookPayloadBookEdgeArgs = {
  orderBy?: Maybe<Array<BooksOrderBy>>;
};

/** All input for the `updateBookByPublicationId` mutation. */
export type UpdateBookByPublicationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Book` being updated. */
  bookPatch: BookPatch;
  publicationId: Scalars['String'];
};

/** All input for the `updateBookByTitle` mutation. */
export type UpdateBookByTitleInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Book` being updated. */
  bookPatch: BookPatch;
  title: Scalars['String'];
};

/** All input for the `updatePublication` mutation. */
export type UpdatePublicationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Publication` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `Publication` being updated. */
  publicationPatch: PublicationPatch;
};

/** The output of our update `Publication` mutation. */
export type UpdatePublicationPayload = {
  __typename?: 'UpdatePublicationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Publication` that was updated by this mutation. */
  publication?: Maybe<Publication>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Publication`. May be used by Relay 1. */
  publicationEdge?: Maybe<PublicationsEdge>;
};


/** The output of our update `Publication` mutation. */
export type UpdatePublicationPayloadPublicationEdgeArgs = {
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
};

/** All input for the `updatePublicationByPublicationId` mutation. */
export type UpdatePublicationByPublicationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Publication` being updated. */
  publicationPatch: PublicationPatch;
  publicationId: Scalars['String'];
};

/** All input for the `updatePublicationAuthor` mutation. */
export type UpdatePublicationAuthorInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicationAuthor` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `PublicationAuthor` being updated. */
  publicationAuthorPatch: PublicationAuthorPatch;
};

/** The output of our update `PublicationAuthor` mutation. */
export type UpdatePublicationAuthorPayload = {
  __typename?: 'UpdatePublicationAuthorPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PublicationAuthor` that was updated by this mutation. */
  publicationAuthor?: Maybe<PublicationAuthor>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `PublicationAuthor`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Author` that is related to this `PublicationAuthor`. */
  authorByAuthorId?: Maybe<Author>;
  /** An edge for our `PublicationAuthor`. May be used by Relay 1. */
  publicationAuthorEdge?: Maybe<PublicationAuthorsEdge>;
};


/** The output of our update `PublicationAuthor` mutation. */
export type UpdatePublicationAuthorPayloadPublicationAuthorEdgeArgs = {
  orderBy?: Maybe<Array<PublicationAuthorsOrderBy>>;
};

/** All input for the `updatePublicationAuthorByPublicationIdAndAuthorId` mutation. */
export type UpdatePublicationAuthorByPublicationIdAndAuthorIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `PublicationAuthor` being updated. */
  publicationAuthorPatch: PublicationAuthorPatch;
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};

/** All input for the `updateTag` mutation. */
export type UpdateTagInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Tag` to be updated. */
  id: Scalars['ID'];
  /** An object where the defined keys will be set on the `Tag` being updated. */
  tagPatch: TagPatch;
};

/** The output of our update `Tag` mutation. */
export type UpdateTagPayload = {
  __typename?: 'UpdateTagPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` that was updated by this mutation. */
  tag?: Maybe<Tag>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Tag`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>;
};


/** The output of our update `Tag` mutation. */
export type UpdateTagPayloadTagEdgeArgs = {
  orderBy?: Maybe<Array<TagsOrderBy>>;
};

/** All input for the `updateTagByTagId` mutation. */
export type UpdateTagByTagIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Tag` being updated. */
  tagPatch: TagPatch;
  tagId: Scalars['String'];
};

/** All input for the `deleteAccount` mutation. */
export type DeleteAccountInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Account` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `Account` mutation. */
export type DeleteAccountPayload = {
  __typename?: 'DeleteAccountPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Account` that was deleted by this mutation. */
  account?: Maybe<Account>;
  deletedAccountId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Account`. May be used by Relay 1. */
  accountEdge?: Maybe<AccountsEdge>;
};


/** The output of our delete `Account` mutation. */
export type DeleteAccountPayloadAccountEdgeArgs = {
  orderBy?: Maybe<Array<AccountsOrderBy>>;
};

/** All input for the `deleteAccountByAccountId` mutation. */
export type DeleteAccountByAccountIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  accountId: Scalars['UUID'];
};

/** All input for the `deleteAccountByEmail` mutation. */
export type DeleteAccountByEmailInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteAccountPublication` mutation. */
export type DeleteAccountPublicationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AccountPublication` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `AccountPublication` mutation. */
export type DeleteAccountPublicationPayload = {
  __typename?: 'DeleteAccountPublicationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AccountPublication` that was deleted by this mutation. */
  accountPublication?: Maybe<AccountPublication>;
  deletedAccountPublicationId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `AccountPublication`. */
  accountByAccountId?: Maybe<Account>;
  /** Reads a single `Publication` that is related to this `AccountPublication`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** An edge for our `AccountPublication`. May be used by Relay 1. */
  accountPublicationEdge?: Maybe<AccountPublicationsEdge>;
};


/** The output of our delete `AccountPublication` mutation. */
export type DeleteAccountPublicationPayloadAccountPublicationEdgeArgs = {
  orderBy?: Maybe<Array<AccountPublicationsOrderBy>>;
};

/** All input for the `deleteAccountPublicationByAccountIdAndPublicationId` mutation. */
export type DeleteAccountPublicationByAccountIdAndPublicationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  accountId: Scalars['UUID'];
  publicationId: Scalars['String'];
};

/** All input for the `deleteAnnotation` mutation. */
export type DeleteAnnotationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Annotation` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `Annotation` mutation. */
export type DeleteAnnotationPayload = {
  __typename?: 'DeleteAnnotationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Annotation` that was deleted by this mutation. */
  annotation?: Maybe<Annotation>;
  deletedAnnotationId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `Annotation`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Account` that is related to this `Annotation`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Annotation`. May be used by Relay 1. */
  annotationEdge?: Maybe<AnnotationsEdge>;
};


/** The output of our delete `Annotation` mutation. */
export type DeleteAnnotationPayloadAnnotationEdgeArgs = {
  orderBy?: Maybe<Array<AnnotationsOrderBy>>;
};

/** All input for the `deleteAnnotationByAnnotationId` mutation. */
export type DeleteAnnotationByAnnotationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  annotationId: Scalars['String'];
};

/** All input for the `deleteAnnotationTag` mutation. */
export type DeleteAnnotationTagInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `AnnotationTag` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `AnnotationTag` mutation. */
export type DeleteAnnotationTagPayload = {
  __typename?: 'DeleteAnnotationTagPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AnnotationTag` that was deleted by this mutation. */
  annotationTag?: Maybe<AnnotationTag>;
  deletedAnnotationTagId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Annotation` that is related to this `AnnotationTag`. */
  annotationByAnnotationId?: Maybe<Annotation>;
  /** Reads a single `Tag` that is related to this `AnnotationTag`. */
  tagByTagId?: Maybe<Tag>;
  /** An edge for our `AnnotationTag`. May be used by Relay 1. */
  annotationTagEdge?: Maybe<AnnotationTagsEdge>;
};


/** The output of our delete `AnnotationTag` mutation. */
export type DeleteAnnotationTagPayloadAnnotationTagEdgeArgs = {
  orderBy?: Maybe<Array<AnnotationTagsOrderBy>>;
};

/** All input for the `deleteAnnotationTagByAnnotationIdAndTagId` mutation. */
export type DeleteAnnotationTagByAnnotationIdAndTagIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  annotationId: Scalars['String'];
  tagId: Scalars['String'];
};

/** All input for the `deleteAuthor` mutation. */
export type DeleteAuthorInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Author` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `Author` mutation. */
export type DeleteAuthorPayload = {
  __typename?: 'DeleteAuthorPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Author` that was deleted by this mutation. */
  author?: Maybe<Author>;
  deletedAuthorId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Author`. May be used by Relay 1. */
  authorEdge?: Maybe<AuthorsEdge>;
};


/** The output of our delete `Author` mutation. */
export type DeleteAuthorPayloadAuthorEdgeArgs = {
  orderBy?: Maybe<Array<AuthorsOrderBy>>;
};

/** All input for the `deleteAuthorByAuthorId` mutation. */
export type DeleteAuthorByAuthorIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  authorId: Scalars['String'];
};

/** All input for the `deleteBook` mutation. */
export type DeleteBookInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Book` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `Book` mutation. */
export type DeleteBookPayload = {
  __typename?: 'DeleteBookPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Book` that was deleted by this mutation. */
  book?: Maybe<Book>;
  deletedBookId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `Book`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** An edge for our `Book`. May be used by Relay 1. */
  bookEdge?: Maybe<BooksEdge>;
};


/** The output of our delete `Book` mutation. */
export type DeleteBookPayloadBookEdgeArgs = {
  orderBy?: Maybe<Array<BooksOrderBy>>;
};

/** All input for the `deleteBookByPublicationId` mutation. */
export type DeleteBookByPublicationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  publicationId: Scalars['String'];
};

/** All input for the `deleteBookByTitle` mutation. */
export type DeleteBookByTitleInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

/** All input for the `deletePublication` mutation. */
export type DeletePublicationInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Publication` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `Publication` mutation. */
export type DeletePublicationPayload = {
  __typename?: 'DeletePublicationPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Publication` that was deleted by this mutation. */
  publication?: Maybe<Publication>;
  deletedPublicationId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Publication`. May be used by Relay 1. */
  publicationEdge?: Maybe<PublicationsEdge>;
};


/** The output of our delete `Publication` mutation. */
export type DeletePublicationPayloadPublicationEdgeArgs = {
  orderBy?: Maybe<Array<PublicationsOrderBy>>;
};

/** All input for the `deletePublicationByPublicationId` mutation. */
export type DeletePublicationByPublicationIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  publicationId: Scalars['String'];
};

/** All input for the `deletePublicationAuthor` mutation. */
export type DeletePublicationAuthorInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `PublicationAuthor` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `PublicationAuthor` mutation. */
export type DeletePublicationAuthorPayload = {
  __typename?: 'DeletePublicationAuthorPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `PublicationAuthor` that was deleted by this mutation. */
  publicationAuthor?: Maybe<PublicationAuthor>;
  deletedPublicationAuthorId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Publication` that is related to this `PublicationAuthor`. */
  publicationByPublicationId?: Maybe<Publication>;
  /** Reads a single `Author` that is related to this `PublicationAuthor`. */
  authorByAuthorId?: Maybe<Author>;
  /** An edge for our `PublicationAuthor`. May be used by Relay 1. */
  publicationAuthorEdge?: Maybe<PublicationAuthorsEdge>;
};


/** The output of our delete `PublicationAuthor` mutation. */
export type DeletePublicationAuthorPayloadPublicationAuthorEdgeArgs = {
  orderBy?: Maybe<Array<PublicationAuthorsOrderBy>>;
};

/** All input for the `deletePublicationAuthorByPublicationIdAndAuthorId` mutation. */
export type DeletePublicationAuthorByPublicationIdAndAuthorIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  publicationId: Scalars['String'];
  authorId: Scalars['String'];
};

/** All input for the `deleteTag` mutation. */
export type DeleteTagInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Tag` to be deleted. */
  id: Scalars['ID'];
};

/** The output of our delete `Tag` mutation. */
export type DeleteTagPayload = {
  __typename?: 'DeleteTagPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Tag` that was deleted by this mutation. */
  tag?: Maybe<Tag>;
  deletedTagId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Account` that is related to this `Tag`. */
  accountByAccountId?: Maybe<Account>;
  /** An edge for our `Tag`. May be used by Relay 1. */
  tagEdge?: Maybe<TagsEdge>;
};


/** The output of our delete `Tag` mutation. */
export type DeleteTagPayloadTagEdgeArgs = {
  orderBy?: Maybe<Array<TagsOrderBy>>;
};

/** All input for the `deleteTagByTagId` mutation. */
export type DeleteTagByTagIdInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  tagId: Scalars['String'];
};
