const AccountMapper = require('./src/account-mapper').default;
const PublicationMapper = require('./src/publication-mapper').default;
const AnnotationMapper = require('./src/annotation-mapper').default;
require('dotenv').config();
const { parseAnnotationsFromGraphql, compareAnnotations } = require('../compare-annotations/src/compare-annotations');
const util =require('util');


// const testBook = {
//   title: 'testPublication1',
//   authors: [ 'testAuthor1', 'testAuthor2' ]
// };

const testBook = {
  title: 'testPublication2',
  authors: [ 'testAuthor1', 'testAuthor2', 'testAuthor3' ]
};

const testNotes = [
  {
    "noteLocation": {
      "kindleLocation": 41,
      "page": "ix",
      "section": "Author’s Note"
    },
    "noteText": "testEmptyNote1",
    "tags": []
  },
  {
    "highlightLocation": {
      "kindleLocation": 58,
      "page": "1",
      "section": "Introduction"
    },
    "color": "yellow",
    "highlightText": "testHighlight1",
    "noteLocation": {
      "kindleLocation": 61,
      "page": "1",
      "section": "Introduction"
    },
    "noteText": "#testTag1 testNote1",
    "tags": [
      "testTag1"
    ]
  },
  {
    "highlightLocation": {
      "kindleLocation": 72,
      "page": "2",
      "section": "Introduction"
    },
    "color": "yellow",
    "highlightText": "testHighlight2",
    "noteLocation": {
      "kindleLocation": 74,
      "page": "2",
      "section": "Introduction"
    },
    "noteText": "testNote2 #testTag1 #testTag2",
    "tags": [
      "testTag1",
      "testTag2"
    ]
  },
  {
    "noteLocation": {
      "kindleLocation": 76,
      "page": "2",
      "section": "Introduction"
    },
    "noteText": "testEmptyNote2 #testTag3 #testTag2 #testTag1",
    "tags": [
      "testTag3",
      "testTag2",
      "testTag1"
    ]
  },
  {
    "highlightLocation": {
      "kindleLocation": 100,
      "page": "3",
      "section": "Introduction"
    },
    "color": "yellow",
    "highlightText": "testHighlight3"
  },
  {
    "highlightLocation": {
      "kindleLocation": 200,
      "page": "3",
      "section": "Introduction",
      "chapter": "New York McDonalds"
    },
    "color": "yellow",
    "highlightText": "The walks, the portraits, the stories I heard, the places they took me, became a process of learning in a different kind of way. Not from textbooks, or statistics, or spreadsheets, or PowerPoint presentations, or classrooms, or speeches, or documentaries—but from people.",
    "noteLocation": {
      "kindleLocation": 74,
      "page": "2",
      "section": "Introduction"
    },
    "noteText": "real life experience"
  },
];

const annotationToUpdate = {
  "highlightLocation": {
    "kindleLocation": 72,

    "section": "Introduction"
  },
  "color": "yellow",
  "highlightText": "testHighlight2",
  "noteLocation": {
    "kindleLocation": 74,
    "page": "2",
    "section": "Introduction"
  },
  "noteText": "testUpdate1"
};

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

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT;
// const GRAPHQL_ENDPOINT = process.env.LOCAL_GRAPHQL_ENDPOINT;
const GRAPHQL_JWT = process.env.GRAPHQL_JWT;
const ACCOUNT_ID = process.env.ACCOUNT_ID;

const mockCognitoPayload = {
  sub: '46d3f3d1-879b-4314-9301-ae470c5a2062',
  email: 'uilxela7@gmail.com',
  emailVerified: true,
  'cognito:groups': ['margins_account']
};

async function addBookAndAnnotations(testBook, testNotes) {
  const publicationMapper = new PublicationMapper(
    GRAPHQL_ENDPOINT,
    GRAPHQL_JWT,
    ACCOUNT_ID
  );
  let bookRes = await publicationMapper.findOrCreatePublication(testBook);
  console.log('test script book response', bookRes);

  const annotationMapper = new AnnotationMapper(
    GRAPHQL_ENDPOINT,
    GRAPHQL_JWT,
    ACCOUNT_ID,
    bookRes.publicationId
  );

  let currentAnnotations = await annotationMapper.getAllAnnotationsFromPublication();


  currentAnnotations = parseAnnotationsFromGraphql(currentAnnotations);
  // will miss orphan note because default is to always create
  console.log('current annotations count: ', currentAnnotations.length);
  console.log('current annotations:\n', currentAnnotations);
  const newAnnotations = testNotes;
  // console.log('parsed new annotations', newAnnotations);
  
  const {
    annotationsToCreate,
    annotationsToUpdate,
    annotationsToAddTags
  } = compareAnnotations(currentAnnotations, newAnnotations);
  console.log('create annotations count:', annotationsToCreate.length);
  console.log('create annotations:\n', annotationsToCreate);
  console.log('update annotations count: ', annotationsToUpdate.length);
  console.log('update annotations:\n', annotationsToUpdate);
  console.log('anotations to add tags:\n', annotationsToAddTags);
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

  console.log('create tags response:\n', util.inspect(createRes, {depth: 5}));
  console.log('add tags response:\n', util.inspect(tagsRes, {depth: 5}));

}

(async () => {
  const accountMapper = new AccountMapper(GRAPHQL_ENDPOINT, GRAPHQL_JWT);
  let accountRes = await accountMapper.findOrCreateCognitoAccount(mockCognitoPayload);
  console.log(accountRes);

  await addBookAndAnnotations(ONBOARDING_BOOK, ONBOARDING_NOTES);

  // for (let i = 0, n= 10; i < n; i++) {
  //   await addBookAndAnnotations({
  //     title: `testPublication${i}`,
  //     authors: ['testAuthor1', 'testAuthor2', 'Author A. Author']
  //   }, testNotes);
  // }
  
  // const allAnnotations = await annotationMapper.getAllAnnotationsFromPublication();
  // console.log('get all annotations response:\n', allAnnotations);
})();

