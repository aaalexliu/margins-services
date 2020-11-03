const graphqlRes = [
  {
    "highlightLocation": null,
    "highlightText": null,
    "createdAt": "2020-11-03T00:17:41.196384+00:00",
    "color": null,
    "noteLocation": "{\"page\":\"ix\",\"section\":\"Author’s Note\",\"kindleLocation\":41}",
    "noteText": "Test empty note"
  },
  {
    "highlightLocation": "{\"page\":\"1\",\"section\":\"Introduction\",\"kindleLocation\":58}",
    "highlightText": "Ifirst walked into the Hunts Point neighborhood of the Bronx because I was told not to. I was told it was too dangerous, too poor, and that I was too white. I was told “nobody goes there for anything other than drugs and prostitutes.” The people directly telling me this were my colleagues (other bankers), my neighbors (other wealthy Brooklynites), and my friends (other academics). All, like me, successful, well-educated people who had opinions on the Bronx but had never really been there.",
    "createdAt": "2020-11-03T00:17:41.218942+00:00",
    "color": "yellow",
    "noteLocation": "{\"page\":\"1\",\"section\":\"Introduction\",\"kindleLocation\":61}",
    "noteText": "Test empty note 2"
  }
];

const newNotes = [
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
  }
];

const deepEqual = require('deep-equal');

function parseHiglightString(note) {
  return {
    highlightLocation: note.highlightLocation ? JSON.parse(note.highlightLocation) : null,
    highlightText: note.highlightText ? note.highlightText : null,
  }
}

function getHighlight(note) {
  return {
    highlightLocation: note.highlightLocation,
    highlightText: note.highlightText,
  }
}

const currentHighlights = graphqlRes.map(note => parseHiglightString(note));
const notMatched = [];

for(let i = 0, newLength = newNotes.length; i < newLength; i++) {
  let newHighlight = getHighlight(newNotes[i]);
  let matchIndex;
  for (let j = 0, currLength = currentHighlights.length; j < currLength; j++) {
    console.log('comparing new:\n', newHighlight, '\nand curr:\n', currentHighlights[j]);
    // ok since in javascript null === null, but in postgress null !== null, which makes more sense
    // here relying on the fact that non-existent object properties are undefined, whereas response will be null
    // therefore if an annotation doesn't have a parent highlight, which will result in undefined
    // it will fail to match with any returned annotations, which will have null
    const isEqual = deepEqual(newHighlight, currentHighlights[j], {strict: true});
    console.log('deep equal result', isEqual);
    if (isEqual) {
      matchIndex = j;
      break;
    }
  }
  if (!matchIndex) {
    notMatched.push(newNotes[i]);
  } else {
    currentHighlights.splice(matchIndex, 1);
  }
}

console.log('not mached notes:\n', notMatched);

