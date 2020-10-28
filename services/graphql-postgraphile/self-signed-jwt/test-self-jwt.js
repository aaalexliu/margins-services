const jwt = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const fs = require('fs');
const rsaPemToJwk = require('rsa-pem-to-jwk');
const { v4: uuidv4 } = require('uuid');

// openssl genrsa -out private.pem 2048
// openssl rsa -in private.pem -pubout -out public.pem
// openssl rsa -in private.pem -RSAPublicKey_out -out rsa-public.pem

const pem = fs.readFileSync('rsa-public.pem');

const jwk = rsaPemToJwk(
  pem,
  {
    use: 'sig',
    alg: 'RS256',
    kid: uuidv4()
  },
  'public'
)

fs.writeFileSync('./self-jwk.json', JSON.stringify(jwk, null, 2), 'utf8');

const publicJwk = JSON.parse(
  fs.readFileSync('./self-jwk.json')
);
console.log(publicJwk);

const privateKey = fs.readFileSync('private.pem');
const token = jwt.sign(
  {
    foo: 'bar'
  },
  privateKey,
  {
    algorithm: 'RS256',
    issuer: 'www.margins.me',
    audience: 'www.margins.me/graphql',
    subject: 'margins-email-lambda',
    expiresIn: '7d'
  }
);

const publicKey = jwkToPem(publicJwk);
const decodedJwt = jwt.verify(token, publicKey);
console.log(decodedJwt);