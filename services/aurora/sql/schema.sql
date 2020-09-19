CREATE SCHEMA margins_private;

SET SCHEMA 'margins_private';

CREATE TABLE publication (
  "publication_id" serial PRIMARY KEY,
);

CREATE TABLE book (
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

CREATE INDEX book_publication_id_index ON book(publication_id);

CREATE TABLE annotation (
  "annotation_id" serial PRIMARY KEY,
  "publication_id" int REFERENCES publication(publication_id),
  "location_begin" int,
  "location_end" int,
  "recorded_at" timestamp,
  "highlight" text,
  "highlight_color" text,
  "note" text,
  "statusline" text UNIQUE,
  "page" int,
  "created_at" timestamp DEFAULT now(),
  "last_modified" timestamp DEFAULT now()
);

CREATE INDEX annotation_publication_id_index ON annotation(publication_id);

CREATE TABLE author (
  "author_id" serial PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE publication_author (
  "publication_id" int REFERENCES publication(publication_id),
  "author_id" int REFERENCES author(author_id),
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE INDEX publication_author_author_id_index ON publication_author(author_id);
-- primary index order is publication_id first so to search author order doesn't match

CREATE TABLE account (
  "account_id" uuid PRIMARY KEY,
  "email" text,
  "last_modified" timestamp,
  "created_at" timestamp,
  "status" text,
  "email_verified" boolean
);

CREATE TABLE account_publication (
  "account_id" uuid REFERENCES account(account_id),
  "publication_id" int REFERENCES publication(publication_id),
  "created_at" timestamp DEFAULT now(),
  "last_modified" timestamp DEFAULT now()
  PRIMARY KEY ("account_id", "publication_id")
);

CREATE TABLE account_annotation (
  "account_id" uuid REFERENCES account(account_id),
  "annotation_id" int REFERENCES annotation(annotation_id),
  PRIMARY KEY ("account_id", "annotation_id")
);

CREATE TABLE tag (
  "tag_id" serial PRIMARY KEY,
  "name" text
);

CREATE TABLE annotation_tag (
  "annnotation_id" int REFERENCES annotation(annotation_id),
  "tag_id" int REFERENCES tag(tag_id),
  PRIMARY KEY ("annotation_id", "tag_id")
);

CREATE INDEX account_tag_annotation_annotation_index ON account_tag_annotation(annotation_id);
-- Primary key order is annotation_id last so to optimize for annotation_id create an index

-- VIEWS

CREATE VIEW account_tag_annotation AS
  SELECT a.account_id, a.annotation_id, b.tag_id FROM account_annotation AS a
  JOIN annotation_tag AS b ON (a.annotation_id = b.annotation_id);

CREATE VIEW full_annotation_tag AS
  SELECT a.location_begin, a.location_end, a.recorded_at, a.highlight, a.highlight_color,
  a.note, a.statusline, a.page, a.last_modified, json_agg(tag.name) AS all_tags FROM annotation AS a
    INNER JOIN annotation_tag ON annotation.annotation_id = annotation_tag.annotation_id
    INNER JOIN tag ON account_tag.tag_id = tag.tag_id
  GROUP BY tag.tag_id;


-- FUNCTIONS

CREATE FUNCTION account_full_name(account account) returns text as $$
  SELECT account.first_name || ' ' || account.last_name
  -- SELECT concat(account.first_name, ' ', account.last_name)
$$ language sql stable;

