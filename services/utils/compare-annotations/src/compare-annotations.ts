
import deepEqual from 'deep-equal';

function parseAnnotation(annotation) {
  return {
    highlightLocation: annotation.highlightLocation ? JSON.parse(annotation.highlightLocation) : null,
    highlightText: annotation.highlightText ? annotation.highlightText : null,
    noteLocation: annotation.noteLocation? JSON.parse(annotation.noteLocation) : null,
    noteText: annotation.noteText? annotation.noteText : null,
  }
}

function getHighlight(annotation) {
  return {
    highlightLocation: annotation.highlightLocation,
    highlightText: annotation.highlightText,
  }
}

export function parseAnnotationNodes(annotationNodes) {
  return annotationNodes.map(annotation => {
    const parsed = parseAnnotation(annotation);
    console.log(parsed);
    // if no parent highlight, return null. this is so orphane notes are never
    // matched with a current highlight, and therefore there is always an attempt to create.
    // duplicate orphan notes will be caught by postgres unique constraint
    // unsure if note location is a stable reference and how granular the location number is,
    // so there might be two different notes with the same location. don't want to overwrite that,
    // so default is to always create and only reject on noteLocation + noteText as a unique identifier
    if (parsed.highlightLocation === null && parsed.highlightText === null) return null;
    return parsed;
  })
  .filter(annotation => annotation);
}


export function compareAnnotations(currentAnnotations, newAnnotations) {
  const annotationsToCreate = [];
  const annotationsToUpdate = [];

  for(let i = 0, newLength = newAnnotations.length; i < newLength; i++) {
    let newHighlight = getHighlight(newAnnotations[i]);
    let matchIndex = -1;;
    for (let j = 0, currLength = currentAnnotations.length; j < currLength; j++) {
      const currentHighlight = getHighlight(currentAnnotations[j]);

      console.log('comparing new:\n', newHighlight, '\nand curr:\n', currentHighlight);
      const isEqual = deepEqual(newHighlight, currentHighlight, {strict: true});
      console.log('deep equal result', isEqual);
      if (isEqual) {
        matchIndex = j;
        break;
      }
    }
    if (matchIndex === -1) {
      annotationsToCreate.push(newAnnotations[i]);
    } else {
      const[matchedAnnotation] = currentAnnotations.splice(matchIndex, 1);
      //assuming that if same highlight, note location should always be the same
      //also being conservative with overwriting metadata, if the user changes a note
      //probably didn't mean to change the note location

      console.log(matchedAnnotation)
      if (matchedAnnotation.noteText !== newAnnotations[i].noteText) annotationsToUpdate.push(newAnnotations[i]);
    }
  }

  return {
    annotationsToCreate,
    annotationsToUpdate
  }
}

// the following is for testing

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
  },
  {
    "highlightLocation": "{\"page\":\"2\",\"section\":\"Introduction\",\"kindleLocation\":72}",
    "highlightText": "The walks, the portraits, the stories I heard, the places they took me, became a process of learning in a different kind of way. Not from textbooks, or statistics, or spreadsheets, or PowerPoint presentations, or classrooms, or speeches, or documentaries—but from people.",
    "createdAt": "2020-11-03T05:49:29.661109+00:00",
    "color": "yellow",
    "noteLocation": "{\"page\":\"2\",\"section\":\"Introduction\",\"kindleLocation\":74}",
    "noteText": "test note 3"
  }
];

const newAnnotations = [
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
    "noteText": "TEST SHOULD BE UPDATED"
  },
  {
    "highlightLocation": {
      "kindleLocation": 76,
      "page": "2",
      "section": "Introduction"
    },
    "color": "yellow",
    "higlightText": "TEST SHOULD BE CREATED"
  },
];

const currentAnnotations = parseAnnotationNodes(graphqlRes);
const {annotationsToCreate, annotationsToUpdate} = compareAnnotations(currentAnnotations, newAnnotations);

console.log('annotations to create:\n', annotationsToCreate);
console.log('annotations to update:\n', annotationsToUpdate);

// KEEPING THIS NOTE, BUT NOT RELEVANT ANYMORE

// ok since in javascript null === null, but in postgress null !== null, which makes more sense
// here relying on the fact that non-existent object properties are undefined, whereas response will be null
// therefore if an annotation doesn't have a parent highlight, which will result in undefined
// it will fail to match with any returned annotations, which will have null.
