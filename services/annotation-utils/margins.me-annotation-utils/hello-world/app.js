/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */

exports.lambdaHandler = function(event, context, callback) {
  console.log('Header matcher');

  var sesNotification = event.Records[0].ses;
  console.log("SES Notification:\n", JSON.stringify(sesNotification, null, 2));
  
  // Iterate over the headers
  for (var index in sesNotification.mail.headers) {
      var header = sesNotification.mail.headers[index];
      
      // Examine the header values
      if (header.name === 'X-Header' && header.value === 'X-Value') {
          console.log('Found header with value.');
          callback(null, null);
          return;
      }
  }
  
  // Stop processing the rule if the header value wasn't found
  callback(null, {'disposition':'STOP_RULE'});    
};