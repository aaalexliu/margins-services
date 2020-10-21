const express = require("express");
const cors = require('cors');
const { postgraphile } = require("postgraphile");
const PgManyToManyPlugin = require("@graphile-contrib/pg-many-to-many");
const PostGraphileNestedMutations = require('postgraphile-plugin-nested-mutations');

const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const ISSUER_DOMAIN = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}`;

// Authentication middleware. When used, the
// Access Token must exist and be verified against
// the Auth0 JSON Web Key Set.
// On successful verification, the payload of the
// decrypted Access Token is appended to the
// request (`req`) as a `user` parameter.
const checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the `kid` in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${ISSUER_DOMAIN}/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  // audience: "4v1q302r040fct1ve3kkhoo30b",
  issuer: ISSUER_DOMAIN,
  algorithms: ["RS256"],
});

const app = express();

app.use(cors());

app.use('/graphql', checkJwt);

app.use(
  postgraphile(process.env.DATABASE_URL, "margins_public", {
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    allowExplain: (req) => { return true; },
    appendPlugins: [PostGraphileNestedMutations, PgManyToManyPlugin],
    ignoreRBAC: false,
    ignoreIndexes: false,
    showErrorStack: "json",
    extendedErrors: ["hint", "detail", "errcode"],
    classicIds: true,
    ownerConnectionString: process.env.OWNER_URL,
    retryOnInitFail: true,
    dynamicJson: true,
    pgSettings: req => {
      const settings = {};
      if (req.user) {
        settings['margins.account_id'] = req.user.sub;
        settings['role'] = req.user['cognito:groups'][0];
      }
      return settings;
    }
  })
);

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('invalid token...');
  }
});

app.listen(8080);