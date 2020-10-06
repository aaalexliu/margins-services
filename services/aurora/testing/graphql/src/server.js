const express = require("express");
const { postgraphile } = require("postgraphile");
const PgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many");

const app = express();

app.use(
  postgraphile(process.env.OWNER_URL, "margins_public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    appendPlugins: [PgManyToManyPlugin],
    ignoreRBAC: false,
    ignoreIndexes: false,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    classicIds: true,
    ownerConnectionString: process.env.OWNER_URL,
    retryOnInitFail: true
  })
);

app.listen(8080);