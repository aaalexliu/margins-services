exports.handler = function(event, context, callback) {
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