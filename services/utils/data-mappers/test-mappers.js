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

  for (let i = 0, n= 10; i < n; i++) {
    await addBookAndAnnotations({
      title: `testPublication${i}`,
      authors: ['testAuthor1', 'testAuthor2', 'Author A. Author']
    }, testNotes);
  }
  
  // const allAnnotations = await annotationMapper.getAllAnnotationsFromPublication();
  // console.log('get all annotations response:\n', allAnnotations);
})();

