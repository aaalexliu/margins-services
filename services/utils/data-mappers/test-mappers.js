const AccountMapper = require('./src/account-mapper').default;
const PublicationMapper = require('./src/publication-mapper').default;
const AnnotationMapper = require('./src/annotation-mapper').default;
require('dotenv').config();

const testBook = {
  title: 'Dignity: Seeking Respect in Back Row America (English Edition)',
  authors: [ 'Chris Arnade' ]
};

const testNotes = [
  {
    "noteLocation": {
      "kindleLocation": 41,
      "page": "ix",
      "section": "Author’s Note"
    },
    "noteText": "Test empty note"
  },
  {
    "highlightLocation": {
      "kindleLocation": 58,
      "page": "1",
      "section": "Introduction"
    },
    "color": "yellow",
    "highlightText": "Ifirst walked into the Hunts Point neighborhood of the Bronx because I was told not to. I was told it was too dangerous, too poor, and that I was too white. I was told “nobody goes there for anything other than drugs and prostitutes.” The people directly telling me this were my colleagues (other bankers), my neighbors (other wealthy Brooklynites), and my friends (other academics). All, like me, successful, well-educated people who had opinions on the Bronx but had never really been there.",
    "noteLocation": {
      "kindleLocation": 61,
      "page": "1",
      "section": "Introduction"
    },
    "noteText": "Test empty note 2"
  },
  {
    "highlightLocation": {
      "kindleLocation": 72,
      "page": "2",
      "section": "Introduction"
    },
    "color": "yellow",
    "highlightText": "The walks, the portraits, the stories I heard, the places they took me, became a process of learning in a different kind of way. Not from textbooks, or statistics, or spreadsheets, or PowerPoint presentations, or classrooms, or speeches, or documentaries—but from people.",
    "noteLocation": {
      "kindleLocation": 74,
      "page": "2",
      "section": "Introduction"
    },
    "noteText": "test note 3"
  },
  // {
  //   "highlightLocation": {
  //     "kindleLocation": 76,
  //     "page": "2",
  //     "section": "Introduction"
  //   },
  //   "color": "yellow",
  //   "highlightText": "This was a slow and shocking revelation to me, one I kept trying to fight. I certainly already knew I was privileged. I had a PhD in theoretical physics. I worked as a bond trader at a big Wall Street firm. I lived in the best part of Brooklyn. I sent my kids to private school. But like most successful and well-educated people, especially those in NYC, I considered myself open-minded, considered, and reflective about my privilege. I read three papers daily, I watched documentaries on our social problems, and I voted for and supported policies that I felt recognized and addressed my privilege. I gave money and time to charities that focused on poverty and injustice. I understood I was selfish, but I rationalized. Aren’t we all selfish? Besides, I am far less selfish than others, look at how I vote (progressive), what I believe in (equality), and who my colleagues are (people of all races from all places)."
  // },
  // {
  //   "highlightLocation": {
  //     "kindleLocation": 337,
  //     "chapter": "One: If You Want to Understand the Country, Visit McDonald’s",
  //     "page": "39",
  //     "section": "New York City"
  //   },
  //   "color": "yellow",
  //   "highlightText": "As the factories, jobs, and many of the people left, those remaining in Portsmouth have done their best to keep the city together, hold tightly to the past, and stay proud. That pride is reflected in the murals, a well-intentioned attempt to sell Portsmouth as a quaint place to visit, but they are also a distraction masking a larger decline."
  // },
  // {
  //   "highlightLocation": {
  //     "kindleLocation": 341,
  //     "chapter": "One: If You Want to Understand the Country, Visit McDonald’s",
  //     "page": "40",
  //     "section": "New York City"
  //   },
  //   "color": "blue",
  //   "highlightText": "Our country is split into two worlds. In one, the downtowns are filled with nightlife, restaurants, well-maintained bike paths, and pedestrian crosswalks. You can tell you’re in this world by the kinds of grocery stores there are and by how many and what kind of vegetables they stock. You can tell by whether the convenience stores carry diet drinks.",
  //   "noteLocation": {
  //     "kindleLocation": 343,
  //     "chapter": "One: If You Want to Understand the Country, Visit McDonald’s",
  //     "page": "40",
  //     "section": "New York City"
  //   },
  //   "noteText": "nice whole foods dig"
  // },
];

const annotationToUpdate = {
  "highlightLocation": {
    "kindleLocation": 72,
    "page": "2",
    "section": "Introduction"
  },
  "color": "yellow",
  "highlightText": "The walks, the portraits, the stories I heard, the places they took me, became a process of learning in a different kind of way. Not from textbooks, or statistics, or spreadsheets, or PowerPoint presentations, or classrooms, or speeches, or documentaries—but from people.",
  "noteLocation": {
    "kindleLocation": 74,
    "page": "2",
    "section": "Introduction"
  },
  "noteText": "TEST SHOULD BE UPDATED"
};

const GRAPHQL_ENDPOINT =   process.env.GRAPHQL_ENDPOINT;
const GRAPHQL_JWT = process.env.GRAPHQL_JWT;
const ACCOUNT_ID = process.env.ACCOUNT_ID;

const mockCognitoPayload = {
  sub: '46d3f3d1-879b-4314-9301-ae470c5a2062',
  email: 'uilxela7@gmail.com',
  emailVerified: true,
  'cognito:groups': ['margins_account']
};

(async () => {
  const accountMapper = new AccountMapper(GRAPHQL_ENDPOINT, GRAPHQL_JWT);
  let accountRes = await accountMapper.findOrCreateCognitoAccount(mockCognitoPayload);
  console.log(accountRes);

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

  const noteResponses = await Promise.all(testNotes.map(note => {
    return annotationMapper.createAnnotation(note);
  }));
  console.log(noteResponses);

  const allAnnotations = await annotationMapper.getAllAnnotationsFromPublication();
  console.log('get all annotations response:\n', allAnnotations);

  const updateResponse = await annotationMapper.updateAnnotationByHighlight(annotationToUpdate);
  console.log('update annotation by highlight response: \n', updateResponse);
})();

