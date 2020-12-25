const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');
const { v4: uuidv4 } = require('uuid');

// openssl genrsa -out private.pem 2048
// openssl rsa -in private.pem -pubout -out public.pem
// openssl rsa -in private.pem -RSAPublicKey_out -out rsa-public.pem

const pem = fs.readFileSync('rsa-public.pem');

//uuidv4()

const jwk = rsaPemToJwk(
  pem,
  {
    use: 'sig',
    alg: 'RS256',
    kid: '8676a8a1-9b9b-4a91-9016-063569707baf'
  },
  'public'
)

fs.writeFileSync('./self-jwk.json', JSON.stringify(jwk, null, 2), 'utf8');

const publicJwk = JSON.parse(
  fs.readFileSync('./self-jwk.json')
);
console.log(publicJwk);

const privateKey = fs.readFileSync('private.pem', 'utf8');
const token = jwt.sign(
  {
    sub: "46d3f3d1-879b-4314-9301-ae470c5a2062",
    "cognito:groups": [
      "margins_account"
    ],
  },
  privateKey,
  {
    algorithm: 'RS256',
    issuer: 'www.margins.me',
    audience: 'www.margins.me/graphql',
    expiresIn: '7d',
    keyid: '8676a8a1-9b9b-4a91-9016-063569707baf'
  },
);

const exportJwt = `GRAPHQL_JWT=${token}`;

fs.writeFileSync('.env', exportJwt, 'utf8');

const publicKey = jwkToPem(publicJwk);
const decodedJwt = jwt.verify(token, publicKey);
console.log(decodedJwt);