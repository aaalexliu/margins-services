
import AWS from 'aws-sdk';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1',
  apiVersion: '2016-04-18',
});

export const lambdaHandler = async (event, context, callback) => {
  console.log('Reject non-registered email accounts');

  const sesNotification = event.Records[0].ses;
  // console.log("SES Notification:\n", JSON.stringify(sesNotification, null, 2));
  debugger;
  const sourceEmail = sesNotification.mail.source;
  console.log(sourceEmail);

  const params = {
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    Username: sourceEmail
  };

  try {
    const results = await cognitoIdentityServiceProvider.adminGetUser(params).promise()
    if (results && results.UserStatus === 'CONFIRMED') {
      callback(null, null);
    } else {
      console.log('Non-confirmed user attempted to send email');
    }
  } catch (error) {
    const code = error.code;
    if (code === 'UserNotFoundException') {
      console.log('Non-user attempted to send email');
    } else {
      console.log('Other error');
      console.error(error);
    }
  }
  callback(null, {'disposition': 'STOP_RULE_SET'});
};