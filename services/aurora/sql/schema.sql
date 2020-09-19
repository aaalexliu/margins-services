CREATE SCHEMA margins_private;

CREATE TABLE margins_private.publication (
  "publication_id" serial PRIMARY KEY,
  "created_at" timestamp,
  "last_modified" timestamp DEFAULT now()
);

CREATE TABLE margins_private.book (
  "publication_id" int REFERENCES publication(publication_id),
  "title" text NOT NULL,
  "isbn" char(13) UNIQUE NOT NULL,
  "image_url" text,
  "language_code" char(3),
  "publisher" text,
  "publication_date" date,
  "description" text,
  "type" text
);

CREATE INDEX margins_private.book_publication_id_index ON margins_private.book(publication_id);

CREATE TABLE margins_private.annotation (
  "annotation_id" serial PRIMARY KEY,
  "publication_id" int REFERENCES publication(publication_id),
  "location_begin" int,
  "location_end" int,
  "time" timestamp,
  "highlight" text,
  "highlight_color" text,
  "note" text,
  "statusline" text UNIQUE,
  "page" int "created_at" timestamp,
  "last_modified" timestamp DEFAULT now()
);

CREATE INDEX margins_private.annotation_publication_id_index ON margins_private.annotation(publication_id);

CREATE TABLE margins_private.author (
  "author_id" serial PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE margins_private.publication_author (
  "publication_id" int REFERENCES publication(publication_id),
  "author_id" int REFERENCES author(author_id),
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE INDEX margins_private.publication_author_author_id_index ON margins_private.publication_author(author_id);
-- primary index order is publication_id first so to search author order doesn't match

CREATE TABLE margins_private.account (
  "account_id" uuid PRIMARY KEY,
  "email" text,
  "last_modified" timestamp,
  "created_at" timestamp,
  "status" text,
  "email_verified" boolean
);

CREATE TABLE margins_private.account_publication (
  "account_id" uuid REFERENCES account(account_id),
  "publication_id" int REFERENCES publication(publication_id),
  PRIMARY KEY ("account_id", "publication_id")
);

CREATE TABLE margins_private.account_annotation (
  "account_id" uuid REFERENCES account(account_id),
  "annotation_id" int REFERENCES annotation(annotation_id),
  PRIMARY KEY ("account_id", "annotation_id")
);

CREATE TABLE margins_private.tag (
  "tag_id" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE margins_private.account_tag_annotation (
  "account_id" uuid REFERENCES account(account_id),
  "tag_id" int REFERENCES tag(tag_id),
  "annotation_id" int REFERENCES annotation(annotation_id),
  PRIMARY KEY ("account_id", "tag_id", "annotation_id")
);

CREATE INDEX margins_private.account_tag_annotation_annotation_index ON margins_private.account_tag_annotation(annotation_id);
-- Primary key order is annotation_id last so to optimize for annotation_id create an index

-- FUNCTIONS

CREATE FUNCTION margins_private.account_full_name(account margins_private.account) returns text as $$
  SELECT account.first_name || ' ' || account.last_name
  -- SELECT concat(account.first_name, ' ', account.last_name)
$$ language sql stable;

