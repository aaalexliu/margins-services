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
  "group" text,
  "first_name" text,
  "last_name" text
);

CREATE FUNCTION is_valid_mongo_id (id text) RETURNS BOOLEAN AS $$
  SELECT id ~* '^[a-f0-9]{24}$';
$$ LANGUAGE SQL IMMUTABLE;

CREATE TABLE publication (
  "publication_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(publication_id)),
  "account_id" uuid REFERENCES account (account_id) ON DELETE CASCADE NOT NULL,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "title" text NOT NULL,
  "additional_meta" jsonb,
  UNIQUE(account_id, title)
);

CREATE INDEX publication_account_id_index ON publication (account_id);

CREATE TABLE book (
  "publication_id" char(24) PRIMARY KEY REFERENCES publication (publication_id) ON DELETE CASCADE,
  "isbn13" char(13) CONSTRAINT is_isbn13 CHECK (char_length(isbn13) = 13),
  "book_title" text NOT NULL,
  "image_url" text,
  "language_code" char(3),
  "publisher" text,
  "publication_date" date,
  "description" text,
  "bookType" text
);

CREATE INDEX book_publication_id_index ON book (publication_id);

CREATE TABLE annotation (
  "annotation_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(annotation_id)),
  "publication_id" char(24) REFERENCES publication (publication_id) ON DELETE CASCADE NOT NULL,
  "account_id" uuid REFERENCES account (account_id) ON DELETE CASCADE NOT NULL,
  "color" text,
  "highlight_location" jsonb,
  "highlight_text" text,
  "note_text" text,
  "note_location" jsonb,
  "recorded_at" timestamp with time zone,
  "created_at" timestamp with time zone DEFAULT now(),
  "updated_at" timestamp with time zone DEFAULT now(),
  "edited_highlight_text" text,
  "extra_edits" jsonb,
  "tsv" tsvector,
  CONSTRAINT no_duplicate_highlights UNIQUE(publication_id, account_id, highlight_location, highlight_text),
  CONSTRAINT no_duplicate_notes UNIQUE(publication_id, account_id, note_location, note_text)
);

CREATE INDEX index_annotation_tsv ON annotation USING gin(tsv);

CREATE OR REPLACE FUNCTION annotation_tsv_trigger() RETURNS TRIGGER AS $$
  BEGIN
    -- NEW.tsv = to_tsvector(
      -- 'pg_catalog.english',
      -- SUBSTRING(
      --   COALESCE(NEW.highlight_text, '') ||
      --   COALESCE(NEW.note_text, ''),
      --   1, 500000
      -- )
    -- );
    NEW.tsv = 
      setweight(to_tsvector(COALESCE(NEW.note_text, '')), 'B') ||
      setweight(to_tsvector(COALESCE(NEW.edited_highlight_text, '')), 'B') ||
      setweight(to_tsvector(COALESCE(NEW.highlight_text, '')), 'C');
    RETURN NEW;
  END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER annotation_tsv_update
BEFORE INSERT OR UPDATE ON annotation
FOR EACH ROW EXECUTE PROCEDURE annotation_tsv_trigger();

CREATE INDEX annotation_publication_id_index ON annotation (publication_id);
CREATE INDEX annotation_account_id_index ON annotation (account_id);

CREATE TABLE author (
  "author_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(author_id)),
  "full_name" text UNIQUE NOT NULL,
  "account_id" uuid NOT NULL REFERENCES account (account_id) ON DELETE CASCADE,
  CONSTRAINT no_duplicate_authors_per_account UNIQUE(account_id, full_name)
);

CREATE INDEX author_name ON author (full_name);

CREATE TABLE publication_author (
  "publication_id" char(24) REFERENCES publication (publication_id) ON DELETE CASCADE NOT NULL,
  "author_id" char(24) REFERENCES author (author_id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY ("publication_id", "author_id")
);

CREATE INDEX publication_author_author_id_index ON publication_author (author_id);

-- primary index order is publication_id first so to search author order doesn't match

CREATE TABLE tag (
  "tag_id" char(24) PRIMARY KEY CHECK (is_valid_mongo_id(tag_id)),
  "tag_name" text NOT NULL,
  "account_id" uuid NOT NULL REFERENCES account (account_id) ON DELETE CASCADE,
  CONSTRAINT no_duplicate_tags_per_account UNIQUE(account_id, tag_name)
);

CREATE INDEX tag_name ON tag (tag_name);

-- CREATE INDEX tag_account_id ON tag (account_id);

CREATE TABLE annotation_tag (
  "annotation_id" char(24) REFERENCES annotation (annotation_id) ON DELETE CASCADE NOT NULL,
  "tag_id" char(24) REFERENCES tag (tag_id) ON DELETE CASCADE NOT NULL,
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

-- RIGHT NOW BROKEN WILL FIX LATER
-- CREATE FUNCTION account_full_name (account account)
--   RETURNS text
--   AS $$
--   SELECT
--     account.first_name || ' ' || account.last_name
--   FROM account;
--     -- SELECT concat(account.first_name, ' ', account.last_name)
-- $$
-- LANGUAGE sql
-- STABLE;

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

-- server side roles postgraphile and lambda should be able to bypass rls
CREATE ROLE margins_postgraphile LOGIN PASSWORD 'margins_postgraphile';

CREATE ROLE margins_lambda WITH BYPASSRLS;

CREATE ROLE margins_anonymous;

CREATE ROLE margins_account;

GRANT margins_anonymous TO margins_postgraphile;
GRANT margins_account TO margins_postgraphile;
GRANT margins_anonymous TO margins_lambda;
GRANT margins_account TO margins_lambda;
GRANT margins_lambda TO margins_postgraphile;

-- set search path for all roles, not inherited
-- possible issue with postgraphile serach path? since it creates other schemas? we'll see

ALTER ROLE margins_admin SET search_path=margins_public, public, "$account";

ALTER ROLE margins_postgraphile SET search_path=margins_public, public, "$account";

ALTER ROLE margins_lambda SET search_path=margins_public, public, "$account";

ALTER ROLE margins_account SET search_path=margins_public, public, "$account";

ALTER ROLE margins_anonymous SET search_path=margins_public, public, "$account";

-- alter default privileges

-- ALTER DEFAULT privileges REVOKE EXECUTE ON functions FROM public;

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
  SELECT current_setting('margins.account_id', TRUE)::uuid;
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
CREATE POLICY account_allow_if_owner ON account FOR ALL USING (account_id = current_account_id ());

ALTER TABLE publication ENABLE ROW LEVEL SECURITY;
CREATE POLICY publication_allow_if_owner ON publication FOR ALL USING (account_id = current_account_id ());

ALTER TABLE annotation ENABLE ROW LEVEL SECURITY;
CREATE POLICY annotation_allow_if_owner ON annotation FOR ALL USING (account_id = current_account_id ());

ALTER TABLE tag ENABLE ROW LEVEL SECURITY;
CREATE POLICY tag_allow_if_owner ON tag FOR ALL USING (account_id = current_account_id ());