const { exec } = require("child_process");
const { stderr } = require("process");
const fs = require('fs');
require('dotenv').config();

const authCommand =
`aws cognito-idp admin-initiate-auth \
  --user-pool-id ${process.env.COGNITO_USER_POOL_ID} \
  --client-id ${process.env.COGNITO_CLIENT_ID} \
  --auth-flow ADMIN_USER_PASSWORD_AUTH \
  --auth-parameters USERNAME=${process.env.COGNITO_USERNAME},PASSWORD=${process.env.COGNITO_PASSWORD}`

exec(authCommand, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout`);
  const { AuthenticationResult } = JSON.parse(stdout);
  // console.log(JSON.stringify(stdout, null, 2))
  fs.writeFileSync('./tokens.json',
    JSON.stringify(AuthenticationResult, null, 2),
    'utf8')
})

