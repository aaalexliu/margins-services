import AWS from 'aws-sdk';
import {
  AccountMapper,
  PublicationMapper,
  AnnotationMapper
} from '../../../utils/data-mappers';
import jwt from 'jsonwebtoken';

const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  region: 'us-east-1',
  apiVersion: '2016-04-18',
});

const ONBOARDING_BOOK = {
  title: 'Handbook: Welcome to Margins 👋',
  authors: ['Margins']
}

let i = 1;

const ONBOARDING_NOTES = [
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "🙌 Welcome 🙌"
    },
    "color": "blue",
    "highlightText": "If this is your first time using Margins, this is both a fully functional demo and a handbook for current features. Learn how to use Margins to enrich the 💭 life of your mind 💭"
  },
  // {
  //   "highlightLocation": {
  //     "kindleLocation": i++,
  //     "section": "Annotations",
  //     "chapter": "Introduction"
  //   },
  //   "color": "red",
  //   "highlightText": "The core of margins.me are annotations, or highlights and notes you've saved"
  // },
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "Annotations",
    },
    "color": "yellow",
    "highlightText": "The core of Margins are your annotations ✍️, or your highlights and notes. To edit an annotation, click on the edit button above. From there, you can edit the highlight text, choose a highlight color, enter detailed location metadata, or add a note.",
    "noteText": "Try and edit me! I'm a note 👀"
  },
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "Annotations",
    },
    "color": "yellow",
    "highlightText": "You can also add tags to an annotation by clicking on the `Add Tag` button below. The input will autocomplete existing tags or allow you to create new tags. And to help clean up, if you delete a tag that has no other associated annotations, that tag will be deleted as well.",
    "tags": [
      "tag/example"
    ]
  },
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "Importing 📥",
    },
    "color": "red",
    "highlightText": "Importing your annotations works like magic 🔮. Open your notes in the kindle app, hit the export button, select email, and simply send to: kindle@margins.me. Thanks to the graciousness of 👑 God-Emperor Bezos 👑, your email will be processed and billed by the 100ms increment without me having to deploy a single server or container.",
    "noteText": "Kindle imports also support inline tagging. #your-tag-here will automatically add a tag. To be processed, the `#` must either be at the start of the note, or follow a whitespace character. After the `#`, all consecutive non-whitespace characters will be captured. If you want to know how the sausage is made, here's the regex if you want to test it out: https://regexr.com/5h75m ",
    "tags": [
      "your-tag-here"
    ]
  },
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "Navigation",
    },
    "color": "orange",
    "highlightText": "The sidebar offers one-click scrolling to section headers."
  },
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "Navigation",
    },
    "color": "orange",
    "highlightText": "By default the app will only load the first 50 annotations. To view more, you can either click load all, or just scroll down - infinite scroll will automatically load the next 50 annotations.",
    "noteText": "Don't worry about having to load annotations again if you decide to switch to another page! As long as you don't refresh the page, previously retrieved data will be loaded directly from the cache and it'll be ⚡️ lightning ⚡️ fast."
  },
  {
    "highlightLocation": {
      "kindleLocation": i++,
      "section": "Navigation",
    },
    "color": "orange",
    "highlightText": "You can also 🔎 search 🔍 through all your annotations with the search bar at the top! Right now, you can only search highlight text and note text, but future implementations will allow for location metadata. When searching, matches in note text are weighted slightly more than matches highlight text, to make sure your notes are surfaced with a higher priority."
  },
];

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

  const GRAPHQL_JWT = generateJWT(event.userName);
  const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;

  const accountMapper = new AccountMapper(GRAPHQL_ENDPOINT, GRAPHQL_JWT);
  const cognitoAccount = getAccountFromEvent(event);
  const accountRes = await accountMapper.createAccountFromCognito(cognitoAccount);
  const ACCOUNT_ID = cognitoAccount.sub;

  const publicationMapper = new PublicationMapper(
    GRAPHQL_ENDPOINT,
    GRAPHQL_JWT,
    ACCOUNT_ID
  );

  const bookRes = await publicationMapper.findOrCreatePublication(ONBOARDING_BOOK);
  console.log('on boarding book response', bookRes);

  const annotationMapper = new AnnotationMapper(
    GRAPHQL_ENDPOINT,
    GRAPHQL_JWT,
    ACCOUNT_ID,
    bookRes.publicationId
  );
  
  const annotationPromises = ONBOARDING_NOTES.map(annotation => {
    return annotationMapper.createAnnotation(annotation);
  });

  console.log('full event object');
  console.log(event);
  const responses = await Promise.all(allPromises);
  console.log(responses);
  callback(null, event);
};

function getAccountFromEvent(event) {
  const user = event.request.userAttributes;
  return {
    sub: user.sub,
    email: user.email,
    emailVerified: user.email_verified === 'true',
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