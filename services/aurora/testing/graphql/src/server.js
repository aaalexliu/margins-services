const express = require("express");
const { postgraphile } = require("postgraphile");
const PgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many");

const app = express();

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [PgManyToManyPlugin],
    ignoreRBAC: false,
    ignoreIndexes: false,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
  })
);

app.listen(8080);