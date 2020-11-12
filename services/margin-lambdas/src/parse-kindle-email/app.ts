// dependencies
import AWS from'aws-sdk';
import * as util from 'util';
import { simpleParser } from 'mailparser';
import { KindleConverter } from '../../../utils/kindle-html-converter/';
import jwt from 'jsonwebtoken';
import { AccountMapper, PublicationMapper,
  AnnotationMapper} from '../../../utils/data-mappers';
import { compareAnnotations, parseAnnotationsFromGraphql} from '../../../utils/compare-annotations';

// get reference to S3 client
const s3 = new AWS.S3();

const authToken = generateJWT();

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

    // download the email from s3 bucket
    let s3email;
    try {
        const params = {
            Bucket: srcBucket,
            Key: srcKey
        };
        const s3emailResponse = await s3.getObject(params).promise();
        s3email = s3emailResponse.Body;

    } catch (error) {
        console.log(error);
        return;
    }
    console.log(s3email);

    const parsedMail = await simpleParser(s3email);

    const senderEmail = parsedMail.from.value[0].address;

    const accountMapper = new AccountMapper(process.env.GRAPHQL_ENDPOINT, authToken);
    const account = await accountMapper.findAccountByEmail(senderEmail);
    console.log('find account response: \n', account);

    const attachment = getAttachment(parsedMail);
    // console.log(attachment);
    const kindleConverter = new KindleConverter(attachment);
    const bookInfo = await kindleConverter.getBookInfo();
    console.log('book info', bookInfo);

    const publicationMapper = new PublicationMapper(
      process.env.GRAPHQL_ENDPOINT,
      authToken,
      account.accountId
    );

    const bookResponse = await publicationMapper.findOrCreatePublication(bookInfo);
    // console.log('book response: \n', bookResponse);

    const annotationMapper = new AnnotationMapper(
      process.env.GRAPHQL_ENDPOINT,
      authToken,
      account.accountId,
      bookResponse.publicationId
    );
    let currentAnnotations = await annotationMapper.getAllAnnotationsFromPublication();
    console.log('current annotations count: ', currentAnnotations.length);
    currentAnnotations = parseAnnotationsFromGraphql(currentAnnotations);
    const newAnnotations = kindleConverter.getBookNotes();
    // console.log('parsed new annotations', newAnnotations);
    
    const {
      annotationsToCreate,
      annotationsToUpdate,
      annotationsToAddTags
    } = compareAnnotations(currentAnnotations, newAnnotations);
    console.log('create annotations count:', annotationsToCreate.length);
    // console.log('create annotations:\n', annotationsToCreate);
    console.log('update annotations count: ', annotationsToUpdate.length);
    // console.log('update annotations:\n', annotationsToUpdate);
    console.log('annotations to add tags count', annotationsToAddTags.length);
    // console.log('annotations to add tags:\n', annotationsToAddTags);
    // console.log(annotationsToUpdate);

    const createAnnotationsPromises = annotationsToCreate.map(annotation => {
      return annotationMapper.createAnnotation(annotation);
    });
    const updatedAnnotationsPromises = annotationsToUpdate.map(annotation => {
      return annotationMapper.updateAnnotationByHighlight(annotation);
    });

    const addTagsPromises = annotationsToAddTags.flatMap(annotation => {
      return annotation.tags.map(tag => {
        return annotationMapper
         .addTagToAnnotation(tag, annotation.annotationId);
      });
    });

    let createRes, updateRes, tagsRes;
    try {
      createRes = await Promise.all(createAnnotationsPromises);
      updateRes = await Promise.all(updatedAnnotationsPromises);
      tagsRes = await Promise.all(addTagsPromises);
    } catch (errors) {
      console.log(errors);
    }
    // console.log(createRes);
    // console.log(updateRes);
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

function generateJWT() {
  const key = process.env.PRIVATE_KEY;
  // console.log('key', key);
  // console.log('rejoined');
  // console.log(key.split('\\n').join('\n'));
  const token = jwt.sign(
    {
      "cognito:groups": [
        "margins_lambda"
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