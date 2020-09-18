CREATE TABLE "publication" (
  "publication_id" SERIAL PRIMARY KEY
);

CREATE TABLE "book" (
  "publication_id" int,
  "title" text NOT NULL,
  "isbn" char(13) NOT NULL,
  "image_url" text,
  "language_code" char(3),
  "publisher" text,
  "publication_date" date,
  "description" text,
  "type" text
);

CREATE TABLE "annotation" (
  "annotation_id" SERIAL PRIMARY KEY,
  "publication_id" int,
  "location_begin" int,
  "location_end" int,
  "time" timestamp,
  "highlight" text,
  "highlight_color" text,
  "note" text,
  "statusline" text UNIQUE,
  "page" int
);

CREATE TABLE "author" (
  "author_id" SERIAL PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE "publication_author" (
  "publication_id" int,
  "author_id" int,
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE TABLE "user" (
  "user_id" uuid PRIMARY KEY,
  "email" text,
  "last_modified" datetime,
  "created" datetime,
  "status" text,
  "email_verified" boolean
);

CREATE TABLE "user_publication" (
  "user_id" uuid,
  "publication_id" int,
  PRIMARY KEY ("user_id", "publication_id")
);

CREATE TABLE "user_annotation" (
  "user_id" uuid,
  "annotation_id" int,
  PRIMARY KEY ("user_id", "annotation_id")
);

CREATE TABLE "tag" (
  "tag_id" SERIAL PRIMARY KEY,
  "tag_name" text
);

CREATE TABLE "user_tag_annotation" (
  "user_id" uuid,
  "tag_id" int,
  "annotation_id" int,
  PRIMARY KEY ("user_id", "tag_id", "annotation_id")
);

ALTER TABLE "book" ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE "annotation" ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE "publication_author" ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE "publication_author" ADD FOREIGN KEY ("author_id") REFERENCES "author" ("author_id");

ALTER TABLE "user_publication" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_publication" ADD FOREIGN KEY ("publication_id") REFERENCES "publication" ("publication_id");

ALTER TABLE "user_annotation" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_annotation" ADD FOREIGN KEY ("annotation_id") REFERENCES "annotation" ("annotation_id");

ALTER TABLE "user_tag_annotation" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "user_tag_annotation" ADD FOREIGN KEY ("tag_id") REFERENCES "tag" ("tag_id");

ALTER TABLE "user_tag_annotation" ADD FOREIGN KEY ("annotation_id") REFERENCES "annotation" ("annotation_id");

ALTER TABLE "user_tag_annotation" ADD FOREIGN KEY ("user_id") REFERENCES "user_tag_annotation" ("tag_id");

CREATE INDEX ON "book" ("publication_id");

CREATE INDEX ON "annotation" ("publication_id");

CREATE INDEX ON "publication_author" ("author_id");

CREATE INDEX ON "user_tag_annotation" ("annotation_id", "tag_id");
