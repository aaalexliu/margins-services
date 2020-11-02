const toJSON = require("kindle-email-to-json");
const fs = require('fs');

const email = fs.readFileSync(
  'uk32hfap3bicj4cmmvmsingtqorntbpaefbkauo1',
  'utf-8'
);

// const getJSONFromEmail = async (email) => {
//   const res =  await toJSON(email);
//   return res;
// } 

// const annotationJSON = getJSONFromEmail(email);
// console.log(annotationJSON);

// annotationJSON.then(res => console.log(res));

const parseMail = require("mailparser").simpleParser;
const { get } = require("http");

// function toJSON(source) {
//   return parseMail(source)
//     .then(attachment)
//     .then(convert);
// }

// /**
//  * @param {String} contents - HTML attachment content
//  * @returns {Object}
//  */
// function convert(contents) {
//   const converter = new Converter(contents);

//   if (converter.valid) {
//     return converter.getJSON();
//   }

//   return new Error(
//     "Invalid mail content. Expected an HTML attachment with Kindle notes."
//   );
// }

/**
 * Get the first HTML attachment from the email
 * @param {Object} mail
 * @param {Array} mail.attachments
 * @returns {String} Attachment's content
 */
function getAttachment(mail) {
  if (mail.attachments) {
    const attachments = mail.attachments.filter(
      attachment => attachment.contentType === "text/html"
    );

    if (attachments.length) return attachments[0].content.toString("utf8");
  }

  return new Error("No valid HTML attachment");
}

async function parseMailSync(email) {
  const parsed = await parseMail(email);
  fs.writeFileSync('parsed-test-email.json', JSON.stringify(parsed, null, 2), 'utf8');
  return parsed;
}

parseMailSync(email).then(parsed => {
  const attachment = getAttachment(parsed);
  fs.writeFileSync('test-attachment.html', attachment, 'utf8');
});