
import deepEqual from 'deep-equal';
// import { GetAllAnnotationsByPublicationQuery } from '../../data-mappers/__generated__/types';
// tagsByAnnotationTagAnnotationIdAndTagId": {
//   "nodes": [
//     {
//       "tagId": "5fab42de08c3082e852481fb",
//       "tagName": "testTag1"
//     }
//   ]
// }


function parseAnnotation(annotation ) {
  let tags = annotation.tagsByAnnotationTagAnnotationIdAndTagId?.nodes?.map(node => node.tagName);
  return {
    annotationId: annotation.annotationId,
    highlightLocation: annotation.highlightLocation != null ? JSON.parse(annotation.highlightLocation) : null,
    highlightText: annotation.highlightText != null ? annotation.highlightText : null,
    noteLocation: annotation.noteLocation != null ? JSON.parse(annotation.noteLocation) : null,
    noteText: annotation.noteText != null ? annotation.noteText : null,
    tags: tags ? tags : [],
  }
}

function getHighlight(annotation) {
  return {
    highlightLocation: annotation.highlightLocation,
    highlightText: annotation.highlightText,
  }
}

export function parseAnnotationsFromGraphql(annotationNodes) {
  return annotationNodes.map(annotation => {
    const parsed = parseAnnotation(annotation);
    // console.log(parsed);

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
  const annotationsToAddTags = [];

  for(let i = 0, newLength = newAnnotations.length; i < newLength; i++) {
    let newHighlight = getHighlight(newAnnotations[i]);
    let matchIndex = -1;;
    for (let j = 0, currLength = currentAnnotations.length; j < currLength; j++) {
      const currentHighlight = getHighlight(currentAnnotations[j]);

      // console.log('comparing new:\n', newHighlight, '\nand curr:\n', currentHighlight);
      const isEqual = deepEqual(newHighlight, currentHighlight, {strict: true});
      // console.log('deep equal result', isEqual);
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

      // console.log(matchedAnnotation)
      // undefined != undefined >> false
      // undefined != null >> false
      // undefined != '' >> true
      if (matchedAnnotation.noteText != newAnnotations[i].noteText) {
        annotationsToUpdate.push({
          annotationId: matchedAnnotation.annotationId,
          ...newAnnotations[i]
        });
      }

      if (newAnnotations[i].tags != undefined) {
        matchedAnnotation['tags'] = newAnnotations[i].tags;
        annotationsToAddTags.push(matchedAnnotation);
      }
    }
  }

  return {
    annotationsToCreate,
    annotationsToUpdate,
    annotationsToAddTags
  }
}
