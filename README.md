# Margins Back End Services

For a deep dive into the architecture decisions (why GraphQL, why serverless, etc.) check out [Margins Architecture Overview](https://alexliusiqing.com/portfolio/margins/overview)

## What's Inside 🧐

```text
├── graphql-api
│   ├── __generated__
│   ├── db
│   ├── docker-compose.yml
│   ├── graphql
│   ├── graphql.schema.json
│   ├── nginx
│   ├── node_modules
│   ├── package.json
│   ├── production.yml
│   ├── self-signed-jwt
│   ├── terraform
│   ├── tests
│   ├── yarn-error.log
│   └── yarn.lock
├── lambdas
│   ├── README.md
│   ├── add-cognito-user-to-group.js
│   ├── babel.config.js
│   ├── events
│   ├── node_modules
│   ├── package.json
│   ├── samconfig.toml
│   ├── src
│     ├── cognito-post-confirm
│     ├── parse-kindle-email
│     └── reject-unregistered-emails
│   ├── template.yaml
│   ├── tsconfig.json
│   ├── webpack.config.js
│   └── yarn.lock
├── terraform-uploads
│   ├── main.tf
│   ├── outputs.tf
│   ├── terraform.tfstate
│   ├── terraform.tfstate.backup
│   └── variables.tf
└── utils
    ├── cognito-tokens
    ├── compare-annotations
    ├── data-mappers
    └── kindle-html-converter

```

### `./graphql-api`
- `docker-compose.yml` and `production.yml`: Docker compose files for development and production. Main differences are that development also spins up a PostgreSQL container for fast database iteration, and production yml has certbot for SSL certificates
- `./db`: Source of truth for PostgreSQL database schema at `./db/init/00-schema.sql`. Should figure out a better naming convention.
- `./graphql`: Code for Express server that runs [PostGraphile](http://postgraphile.com/), also verifies requests have either a Cognito JWT or a self-signed JWT.
- `./nginx`: Nginx config and Docker file.
- `./self-signed-jwt`: All the fancy JWKs and PEMs that I generated using CLI commands copy and pasted from StackOverflow. Also where I test my self-signed JWT.
- `./terraform`: All the Infrastructure-as-Code to deploy the full API, currently in one `main.tf` file, should modularize. Also contains the Terraform dependency graph visualization tool [blastradius](https://github.com/28mm/blast-radius).

### `./lambdas`
All lambdas deployed with AWS SAM. 100% TypeScript, built using webpack and [aws-sam-webpack-plugin](https://github.com/graphboss/aws-sam-webpack-plugin) instead of the painfully slow SAM build process.
- `./events`: Where I keep AWS event examples
- `template.yaml`: SAM config, which is basically CloudFormation.
- `./src`: Where all the code for each Lambda lives.

### `./terraform-uploads`
Folder for S3 infrastructure that handles Kindle emails. Should probably reorganize to make it clearer that it's part of the Email Handling service.

### `./utils`
- `./cognito-tokens`: Scripts to programatically retrieve Cognito tokens
- `./compare-annotations`: Library to determine that annotation objects are unique
- `./data-mappers`: Library to convert Javascript objects into GraphQL API calls
- `./kindle-html-converter`: Library to parse emails containing Kindle note HTML exports into Javascript objects.