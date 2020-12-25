const { createPostGraphileSchema } = require("postgraphile");
const { printSchema, printIntrospectionSchema } = require('graphql');
fs = require('fs');

console.log('yolo');
createPostGraphileSchema(
  'postgres://margins_test:margins_test@localhost:8000/margins_test',
  'public'
)
  .then(schema => outputSchema(schema))
  .catch(error => console.log(error));


function outputSchema(schema) {
  debugger;
  fs.writeFile('schema.gql', printSchema(schema), error => {
    console.log(error);
  });

  fs.writeFile('schema-introspection.gql', printIntrospectionSchema(schema), error => {
    console.log(error);
  })
} 