var aws = require('aws-sdk');
aws.config.update({region: 'us-east-1'});
exports.handler = (event, context, callback) => {
    const UserAttributes = [];
    
    if (event.request.userAttributes.email) {
        if (event.request.userAttributes["cognito:user_status"] === "EXTERNAL_PROVIDER") {
            UserAttributes.push({
              Name: "email_verified",
              Value: "true"
            });
        }
    }
    
    
    const cognitoIdServiceProvider = new aws.CognitoIdentityServiceProvider({
                apiVersion: '2016-04-18',
                region: 'us-east-1'
            });
            
    const params = {
        UserPoolId: event.userPoolId,
        Username: event.userName,
        UserAttributes
    };
    
    cognitoIdServiceProvider.adminUpdateUserAttributes(params, function(err, data) {
      if (err) {
            callback(null, event);
      } else {
            callback(null, event);
      }
    });
    
    // add user to group margins_account
    const groupParams = {
        GroupName: 'margins_account',
        UserPoolId: event.userPoolId,
        Username: event.userName,
    }
    
    cognitoIdServiceProvider.adminAddUserToGroup(groupParams, (err) => {
        if (err) { callback(err) }
        callback(null, event);
    });
};