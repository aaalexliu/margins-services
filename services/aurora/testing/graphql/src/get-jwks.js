require('dotenv').config();
const fs = require('fs');
const fetch = require('node-fetch')

const cognitoURL = `https://cognito-idp.${process.env.COGNITO_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`;

async function getJWK() {
  const keys = await fetch(cognitoURL);
  const jwks = await keys.json();
  console.log('successfully retrieved jwks')
  fs.writeFileSync('./jwks.json', JSON.stringify(jwks, null, 2), 'utf-8');
}

getJWK();