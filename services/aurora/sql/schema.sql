CREATE SCHEMA margins_private;

CREATE TABLE margins_private.publication (
  "publication_id" serial PRIMARY KEY,
  "created_at" timestamp,
  "last_modified" timestamp DEFAULT now()
);

CREATE TABLE margins_private.book (
  "publication_id" int,
  "title" text NOT NULL,
  "isbn" char(13) UNIQUE NOT NULL,
  "image_url" text,
  "language_code" char(3),
  "publisher" text,
  "publication_date" date,
  "description" text,
  "type" text
);

CREATE TABLE margins_private.book (
  "annotation_id" serial PRIMARY KEY,
  "publication_id" int,
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

CREATE TABLE margins_private.author (
  "author_id" serial PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE margins_private.publication_author (
  "publication_id" int,
  "author_id" int,
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE TABLE margins_private.account (
  "account_id" uuid PRIMARY KEY,
  "email" text,
  "last_modified" timestamp,
  "created_at" timestamp,
  "status" text,
  "email_verified" boolean
);

CREATE TABLE margins_private.account_publication (
  "account_id" uuid,
  "publication_id" int,
  PRIMARY KEY ("account_id", "publication_id")
);

CREATE TABLE margins_private.account_annotation (
  "account_id" uuid,
  "annotation_id" int,
  PRIMARY KEY ("account_id", "annotation_id")
);

CREATE TABLE margins_private.tag (
  "tag_id" serial PRIMARY KEY,
  "tag_name" text
);

CREATE TABLE margins_private.account_tag_annotation (
  "account_id" uuid,
  "tag_id" int,
  "annotation_id" int,
  PRIMARY KEY ("account_id", "tag_id", "annotation_id")
);

ALTER TABLE margins_private.book
  ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE margins_private.annotation
  ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE margins_private.publication_author
  ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE margins_private.publication_author
  ADD FOREIGN KEY ("author_id") REFERENCES "author" ("author_id");

ALTER TABLE margins_private.account_publication
  ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE margins_private.account_publication
  ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE margins_private.account_annotation
  ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE margins_private.account_annotation
  ADD FOREIGN KEY ("annotation_id") REFERENCES "annotation" ("annotation_id");

ALTER TABLE margins_private.account_tag_annotation
  ADD FOREIGN KEY ("account_id") REFERENCES "account" ("account_id");

ALTER TABLE margins_private.account_tag_annotation
  ADD FOREIGN KEY ("tag_id") REFERENCES "tag" ("tag_id");

ALTER TABLE margins_private.account_tag_annotation
  ADD FOREIGN KEY ("annotation_id") REFERENCES "annotation" ("annotation_id");

ALTER TABLE margins_private.account_tag_annotation
  ADD FOREIGN KEY ("account_id") REFERENCES "account_tag_annotation" ("tag_id");

CREATE INDEX ON margins_private.book ("publication_id");

CREATE INDEX ON margins_private.annotation ("publication_id");

CREATE INDEX ON margins_private.publication_author ("author_id");

CREATE INDEX ON margins_private.account_tag_annotation ("annotation_id", "tag_id");

-- FUNCTIONS

CREATE FUNCTION 