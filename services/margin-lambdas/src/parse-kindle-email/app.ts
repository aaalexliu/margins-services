// dependencies
import AWS from'aws-sdk';
import * as util from 'util';
import { simpleParser } from 'mailparser';
import { KindleConverter } from '../../../utils/kindle-html-converter/';
// const sharp = require('sharp');

// get reference to S3 client
const s3 = new AWS.S3();

exports.lambdaHandler = async (event, context, callback) => {

    // Read options from the event parameter.
    console.log("Reading options from event:\n", util.inspect(event, {depth: 5}));
    const srcBucket = event.Records[0].s3.bucket.name;
    console.log('s3 event record');
    console.log(event.Records[0].s3)
    // Object key may have spaces or unicode non-ASCII characters.
    const srcKey    = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));
    const dstBucket = srcBucket;
    // const dstKey    = "resized-" + srcKey;

    // // Infer the image type from the file suffix.
    // const typeMatch = srcKey.match(/\.([^.]*)$/);
    // if (!typeMatch) {
    //     console.log("Could not determine the image type.");
    //     return;
    // }

    // // Check that the image type is supported  
    // const imageType = typeMatch[1].toLowerCase();
    // if (imageType != "jpg" && imageType != "png") {
    //     console.log(`Unsupported image type: ${imageType}`);
    //     return;
    // }

    // download the email from s3 bucket
    let email;
    try {
        const params = {
            Bucket: srcBucket,
            Key: srcKey
        };
        const emailResponse = await s3.getObject(params).promise();
        email = emailResponse.Body;

    } catch (error) {
        console.log(error);
        return;
    }
    console.log(email);

    const parsedMail = await simpleParser(email);
    const attachment = getAttachment(parsedMail);
    // console.log(attachment);

    const kindleConverter = new KindleConverter(attachment);
    const bookInfo = kindleConverter.getBookInfo();
    console.log('book info', bookInfo);

    const bookNotes = kindleConverter.getBookNotes();
    console.log('book notes', bookNotes);

    // Upload the thumbnail image to the destination bucket
    // try {
    //     const destparams = {
    //         Bucket: dstBucket,
    //         Key: dstKey,
    //         Body: buffer,
    //         ContentType: "application/json; charset=utf-8"
    //     };

    //     const putResult = await s3.putObject(destparams).promise(); 
        
    // } catch (error) {
    //     console.log(error);
    //     return;
    // } 
        
    // console.log('Successfully resized ' + srcBucket + '/' + srcKey +
    //     ' and uploaded to ' + dstBucket + '/' + dstKey); 
};

function getAttachment(mail) {
  if (mail.attachments) {
    const attachments = mail.attachments.filter(
      attachment => attachment.contentType === "text/html"
    );

    if (attachments.length) return attachments[0].content.toString("utf8");
  }

  return new Error("No valid HTML attachment");
}
