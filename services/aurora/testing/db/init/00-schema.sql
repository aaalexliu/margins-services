-- CREATE SCHEMA IF NOT EXISTS margins_public;
-- SET SCHEMA 'margins_public';
CREATE SCHEMA IF NOT EXISTS margins_public;

SET SCHEMA 'margins_public';

CREATE TABLE "account" (
  "account_id" uuid PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone DEFAULT now(),
  "status" text,
  "email_verified" boolean,
  "role" text,
  "first_name" text,
  "last_name" text
);

CREATE FUNCTION is_valid_mongo_id (id text) RETURNS BOOLEAN AS $$
  SELECT id ~* '^[a-f0-9]{24}$';
$$ LANGUAGE SQL IMMUTABLE;

CREATE TABLE publication (
  "publication_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(publication_id)),
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone
);

CREATE TABLE book (
  "book_id" char(13) PRIMARY KEY CONSTRAINT is_isbn13 CHECK (char_length(book_id) = 13),
  "publication_id" char(24) REFERENCES publication (publication_id) NOT NULL,
  "title" text NOT NULL,
  "image_url" text,
  "language_code" char(3),
  "publisher" text,
  "publication_date" date,
  "description" text,
  "type" text
);

COMMENT ON COLUMN book.book_id IS 'natural key of isbn13';

CREATE INDEX book_publication_id_index ON book (publication_id);

CREATE TYPE annotation_kind AS ENUM(
  'highlight',
  'note'
);

CREATE TABLE annotation (
  "annotation_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(annotation_id)),
  "publication_id" char(24) REFERENCES publication (publication_id) NOT NULL,
  "account_id" uuid REFERENCES account (account_id) NOT NULL,
  "recorded_at" timestamp with time zone,
  "text" text,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  "kind" annotation_kind,
  "location" jsonb
);

CREATE INDEX annotation_publication_id_index ON annotation (publication_id);
CREATE INDEX annotation_account_id_index ON annotation (account_id);

CREATE TABLE author (
  "author_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(author_id)),
  "first_name" text,
  "last_name" text
);

CREATE TABLE publication_author (
  "publication_id" char(24) REFERENCES publication (publication_id) NOT NULL,
  "author_id" char(24) REFERENCES author (author_id) NOT NULL,
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE INDEX publication_author_author_id_index ON publication_author (author_id);

-- primary index order is publication_id first so to search author order doesn't match

CREATE TABLE account_publication (
  "account_id" uuid REFERENCES account (account_id) NOT NULL,
  "publication_id" char(24) REFERENCES publication (publication_id) NOT NULL,
  PRIMARY KEY ("account_id", "publication_id")
);

CREATE INDEX account_publication_publication_id ON account_publication (publication_id);

CREATE TABLE tag (
  "tag_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(tag_id)),
  "name" text NOT NULL,
  "account_id" uuid NOT NULL REFERENCES account (account_id)
);

CREATE INDEX tag_account_id ON tag (account_id);

CREATE TABLE annotation_tag (
  "annotation_id" char(24) REFERENCES annotation (annotation_id) NOT NULL,
  "tag_id" char(24) REFERENCES tag (tag_id) NOT NULL,
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
  annotation AS a
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
--   a.updated_at,
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

-- TRIGGER for created_at column

CREATE OR REPLACE FUNCTION insert_created_at() RETURNS TRIGGER AS $$
    BEGIN
      NEW.created_at = now();
      RETURN NEW;
    END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER account_created_at
BEFORE INSERT ON account
FOR EACH ROW EXECUTE PROCEDURE insert_created_at();

CREATE TRIGGER publication_created_at
BEFORE INSERT ON publication
FOR EACH ROW EXECUTE PROCEDURE insert_created_at();

CREATE TRIGGER annotation_created_at
BEFORE INSERT ON annotation
FOR EACH ROW EXECUTE PROCEDURE insert_created_at();

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

ALTER ROLE margins_admin SET search_path=margins_public, public, "$account";

ALTER ROLE margins_postgraphile SET search_path=margins_public, public, "$account";

ALTER ROLE margins_account SET search_path=margins_public, public, "$account";

ALTER ROLE margins_anonymous SET search_path=margins_public, public, "$account";

-- alter default privileges
ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;

-- all roles can use the margins_public schema
GRANT USAGE ON SCHEMA margins_public TO margins_account, margins_anonymous;

--select for all roles, usage only for account
GRANT SELECT ON ALL SEQUENCES IN SCHEMA margins_public TO margins_account, margins_anonymous;

GRANT USAGE ON ALL SEQUENCES IN SCHEMA margins_public TO margins_account;

--select for all roles, insert update delete only for account
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
--   "role": "account",
--   "account_id": 2
-- }
-- Would result in the following SQL being run:
-- set local role account;
-- set local jwt.claims.sub to 'postgraphql';
-- set local jwt.claims.role to 'account';
-- set local jwt.claims.account_id to 2;
ALTER TABLE account ENABLE ROW LEVEL SECURITY;

ALTER TABLE account_publication ENABLE ROW LEVEL SECURITY;

CREATE POLICY account_allow_if_owner ON account FOR ALL USING (account_id = current_account_id ());

CREATE POLICY account_publication_allow_if_owner ON account_publication FOR ALL USING (account_id = current_account_id ());