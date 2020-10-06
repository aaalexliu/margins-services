-- CREATE SCHEMA IF NOT EXISTS margins_public;
-- SET SCHEMA 'margins_public';
CREATE SCHEMA IF NOT EXISTS margins_public;

SET SCHEMA 'margins_public';

CREATE TABLE account (
  "account_id" uuid PRIMARY KEY,
  "email" text NOT NULL,
  "created_at" timestamp with time zone,
  "last_modified" timestamp with time zone DEFAULT now(),
  "status" text,
  "email_verified" boolean,
  "role" text,
  "first_name" text,
  "last_name" text
);

CREATE TABLE publication (
  "publication_id" serial PRIMARY KEY,
  "created_at" timestamp with time zone,
  "last_modified" timestamp with time zone
);

CREATE TABLE book (
  "book_id" int REFERENCES publication (publication_id) NOT NULL,
  "title" text NOT NULL,
  "isbn" char(13) UNIQUE NOT NULL,
  "image_url" text,
  "language_code" char(3),
  "publisher" text,
  "publication_date" date,
  "description" text,
  "type" text,
);

CREATE INDEX book_publication_id_index ON book (publication_id);

CREATE TABLE annotation (
  "annotation_id" serial PRIMARY KEY,
  "publication_id" int REFERENCES publication (publication_id) NOT NULL,
  "account_id" uuid REFERENCES account (account_id) NOT NULL,
  "location_begin" int,
  "location_end" int,
  "recorded_at" timestamp with time zone,
  "highlight" text,
  "highlight_color" text,
  "note" text,
  "statusline" text UNIQUE,
  "page" int,
  "created_at" timestamp with time zone DEFAULT now(),
  "last_modified" timestamp with time zone DEFAULT now()
);

CREATE INDEX annotation_publication_id_index ON annotation (publication_id);

CREATE TABLE author (
  "author_id" serial PRIMARY KEY,
  "first_name" text,
  "last_name" text
);

CREATE TABLE publication_author (
  "publication_id" int REFERENCES publication (publication_id) NOT NULL,
  "author_id" int REFERENCES author (author_id) NOT NULL,
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE INDEX publication_author_author_id_index ON publication_author (author_id);

-- primary index order is publication_id first so to search author order doesn't match

CREATE TABLE account_publication (
  "account_id" uuid REFERENCES account (account_id) NOT NULL,
  "publication_id" int REFERENCES publication (publication_id) NOT NULL,
  PRIMARY KEY ("account_id", "publication_id")
);

CREATE INDEX account_publication_publication_id ON account_publication (publication_id);

CREATE TABLE tag (
  "tag_id" serial PRIMARY KEY,
  "name" text NOT NULL
);

CREATE TABLE annotation_tag (
  "annotation_id" int REFERENCES annotation (annotation_id) NOT NULL,
  "tag_id" int REFERENCES tag (tag_id) NOT NULL,
  PRIMARY KEY ("annotation_id", "tag_id")
);

CREATE INDEX annotation_tag_tag_id ON annotation_tag (tag_id);

-- Primary key order is annotation_id last so to optimize for annotation_id create an index
-- VIEWS
CREATE VIEW account_tag_annotation AS
SELECT
  a.account_id,
  a.annotation_id,
  b.tag_id
FROM
  account_annotation AS a
  JOIN annotation_tag AS b ON (a.annotation_id = b.annotation_id);

-- CREATE VIEW full_annotation_tag AS
-- SELECT
--   a.location_begin,
--   a.location_end,
--   a.recorded_at,
--   a.highlight,
--   a.highlight_color,
--   a.note,
--   a.statusline,
--   a.page,
--   a.last_modified,
--   json_agg(tag.name) AS all_tags
-- FROM
--   annotation AS a
--   INNER JOIN annotation_tag ON a.annotation_id = annotation_tag.annotation_id
--   INNER JOIN tag ON annotation_tag.tag_id = tag.tag_id
-- GROUP BY
--   tag.tag_id;

-- FUNCTIONS
CREATE FUNCTION account_full_name (account account)
  RETURNS text
  AS $$
  SELECT
    account.first_name || ' ' || account.last_name
  FROM account;
    -- SELECT concat(account.first_name, ' ', account.last_name)
$$
LANGUAGE sql
STABLE;

-- ROLES
-- margins_postgraphile will have the union of all privileges granted to
-- margins_anonymous and margins_account
CREATE ROLE margins_postgraphile WITH LOGIN PASSWORD 'margins_postgraphile';

CREATE ROLE margins_anonymous;

GRANT margins_anonymous TO margins_postgraphile;

CREATE ROLE margins_account;

GRANT margins_account TO margins_postgraphile;

-- set search path for all roles, not inherited
-- possible issue with postgraphile serach path? since it creates other schemas? we'll see

ALTER ROLE margins_admin SET search_path=margins_public, public, "$user";

ALTER ROLE margins_postgraphile SET search_path=margins_public, public, "$user";

ALTER ROLE margins_account SET search_path=margins_public, public, "$user";

ALTER ROLE margins_anonymous SET search_path=margins_public, public, "$user";

-- alter default privileges
ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;

-- all roles can use the margins_public schema
GRANT USAGE ON SCHEMA margins_public TO margins_account, margins_anonymous;

--select for all roles, usage only for account holders
GRANT SELECT ON ALL SEQUENCES IN SCHEMA margins_public TO margins_account, margins_anonymous;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA margins_public TO margins_account;

--select for all roles, insert update delete only for account holders
GRANT SELECT ON ALL TABLES IN SCHEMA margins_public TO margins_account, margins_anonymous;

GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA margins_public TO margins_account;

-- ROW LEVEL SECURITY
CREATE FUNCTION current_account_id ()
  RETURNS uuid
  AS $$
  SELECT current_setting('jwt.claims.sub', TRUE)::uuid;
$$
LANGUAGE sql
STABLE;

-- A JSON Web Token with the following claims:
-- {
--   "sub": "postgraphql",
--   "role": "user",
--   "user_id": 2
-- }
-- Would result in the following SQL being run:
-- set local role user;
-- set local jwt.claims.sub to 'postgraphql';
-- set local jwt.claims.role to 'user';
-- set local jwt.claims.user_id to 2;
ALTER TABLE account ENABLE ROW LEVEL SECURITY;

ALTER TABLE account_annotation ENABLE ROW LEVEL SECURITY;

ALTER TABLE account_publication ENABLE ROW LEVEL SECURITY;

CREATE POLICY account_allow_if_owner ON account FOR ALL USING (account_id = current_account_id ());

CREATE POLICY account_annotation_allow_if_owner ON account_annotation FOR ALL USING (account_id = current_account_id ());

CREATE POLICY account_publication_allow_if_owner ON account_publication FOR ALL USING (account_id = current_account_id ());


-- in the future will hide book_id as that would expose a detail of internal implementation that could be misused by end users.
CREATE FUNCTION create_book (newBook book)
  RETURNS book
  AS $$
  WITH publication_fk AS (
    INSERT INTO publication ("publication_id") VALUES (DEFAULT) RETURNING "publication_id"
  )
  INSERT INTO book ("book_id", "title", "isbn", "image_url", "language_code", "publisher", "publication_date", "description", "type")
  VALUES (
    (SELECT publication_id FROM publication_fk),
    newBook.title,
    newBook.isbn,
    newBook.image_url,
    newBook.language_code,
    newBook.publisher,
    newBook.publication_date,
    newBook.description,
    newBook.type
  ) RETURNING book
  ;
$$
LANGUAGE SQL
VOLATILE;
