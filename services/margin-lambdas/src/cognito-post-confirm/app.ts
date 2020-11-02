import AWS from 'aws-sdk';
import { AccountMapper } from '../../../utils/data-mappers';
import jwt from 'jsonwebtoken';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1',
  apiVersion: '2016-04-18',
});

exports.lambdaHandler = async (event, context, callback) => {
  const allPromises = [];
  const UserAttributes = [];
  
  if (event.request.userAttributes.email) {
    if (event.request.userAttributes["cognito:user_status"] === "EXTERNAL_PROVIDER") {
      UserAttributes.push({
        Name: "email_verified",
        Value: "true"
      });
    }
  }
      
  if (UserAttributes.length > 0) {
    const params = {
      UserPoolId: event.userPoolId,
      Username: event.userName,
      UserAttributes
    };

    const updateUserPromise =  cognitoIdentityServiceProvider.adminUpdateUserAttributes(params).promise();
    // updateUserPromise.then(data => {
    //   console.log('update cognito user response:');
    //   console.log(data);
    // }).catch(error => {
    //   console.log('error when updating user');
    //   console.error(error);
    // });
    allPromises.push(updateUserPromise);
  }
  
  // add user to group margins_account
  const groupParams = {
      GroupName: 'margins_account',
      UserPoolId: event.userPoolId,
      Username: event.userName,
  }

  const addUserToGroupPromise = cognitoIdentityServiceProvider.adminAddUserToGroup(groupParams).promise();
  allPromises.push(addUserToGroupPromise);
  // addUserToGroupPromise.then(data => {
  //   console.log('add user to group response');
  //   console.log(data);
  // }).catch(error => {
  //   console.log('error when adding user to group');
  //   console.error(error);
  // });
  // console.log('key');
  // console.log(process.env.PRIVATE_KEY);
  // console.log(process.env.GRAPHQL_ENDPOINT);
  // let a = process.env.PRIVATE_KEY;
  // console.log(a);
  // console.log(a.split('n').join('\n'));

  const graphqlJwt = generateJWT(event.userName);
  const accountMapper = new AccountMapper(process.env.GRAPHQL_ENDPOINT, graphqlJwt);
  const cognitoAccount = createCognitoAccountInput(event);
  const createAccountPromise = accountMapper.createAccountFromCognito(cognitoAccount);
  allPromises.push(createAccountPromise);



  console.log('full event object');
  console.log(event);
  const responses = await Promise.all(allPromises);
  console.log(responses);
  callback(null, event);
};

function createCognitoAccountInput(event) {
  const user = event.request.userAttributes;
  return {
    sub: user.sub,
    email: user.email,
    emailVerified: user.email_verified,
    'cognito:groups': ['margins_account']
  }
}

function generateJWT(accountId: string) {
  const key = process.env.PRIVATE_KEY;
  // console.log('key', key);
  // console.log('rejoined');
  // console.log(key.split('\\n').join('\n'));
  const token = jwt.sign(
    {
      sub: accountId,
      "cognito:groups": [
        "margins_account"
      ],
    },
    key,
    {
      algorithm: 'RS256',
      issuer: 'www.margins.me',
      audience: 'www.margins.me/graphql',
      expiresIn: '1h',
      keyid: '8676a8a1-9b9b-4a91-9016-063569707baf'
    },
  );
  return token;
}