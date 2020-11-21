import { GraphQLClient, gql }  from 'graphql-request';

import {
  CreateAnnotationMutationVariables,
  GetAllAnnotationsByPublicationQueryVariables,
  UpdateAnnotationByHighlightMutationVariables,
  CreateTagMutationVariables
} from '../__generated__/types';

import DataMapper from './data-mapper';

const MUTATION_CREATE_ANNOTATION = gql`
  mutation CreateAnnotation($inputAnnotation: CreateAnnotationInput!) {
    __typename
    createAnnotation(input: $inputAnnotation) {
      annotation {
        annotationId
        highlightLocation
        highlightText
        noteLocation
        noteText
      }
    }
  }
`
const QUERY_ALL_ANNOTATIONS = gql`
  query GetAllAnnotationsByPublication($annotationCondition: AnnotationCondition!) {
    __typename
    allAnnotations(condition: $annotationCondition) {
      nodes {
        annotationId
        highlightLocation
        highlightText
        color
        noteLocation
        noteText
        tagsByAnnotationTagAnnotationIdAndTagId {
          nodes {
            tagId
            tagName
          }
        }
      }
    }
  }
`;

const MUTATION_UPDATE_ANNOTATION_BY_HIGHLIGHT = gql`
  mutation UpdateAnnotationByHighlight($updateAnnotation: UpdateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightTextInput!) {
    __typename
    updateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightText(input: $updateAnnotation) {
      annotation {
        annotationId
        highlightLocation
        highlightText
        color
        noteLocation
        noteText
      }
    }
  }
`;

const MUTATION_CREATE_TAG = gql`
  mutation CreateTag($inputTag: CreateTagInput!) {
    __typename
    createTag(input: $inputTag) {
      tag {
        id
        tagId
        tagName
      }
    }
  }
`;

const QUERY_ALL_TAGS_FOR_ACCOUNT = gql`
  query GetAllTagsForAccount($accountId: UUID!) {
    __typename
    allTags(condition: {accountId: $accountId}) {
      nodes {
        tagId
        id
        tagName
      }
    }
  }
`;

const QUERY_GET_TAG_BY_NAME = gql`
  query GetTagByAccountIdAndName($accountId: UUID!, $tagName: String!) {
     tagByAccountIdAndTagName(accountId: $accountId, tagName: $tagName) {
      tagId
      tagName
    }
  }
`;

const MUTATION_ADD_TAG_TO_ANNOTATION = gql`
  mutation AddTagToAnnotation($annotationId: String!, $tagId: String!) {
    __typename
    createAnnotationTag(
      input: {
        annotationTag: {
          annotationId: $annotationId
          tagId: $tagId
        }
      }
    ) {
      annotationTag {
        annotationId
        tagId
      }
    }
  }
`;

interface Highlight {
  highlightText: string,
  color: string,
  highlightLocation: any
}

interface Note {
  noteText: string,
  noteLocation: any
}

interface Tagged {
  tags?: string[]
}

type Annotation = Highlight & Note & Tagged;

export default class AnnotationMapper extends DataMapper {
  publicationId: string;
  accountId: string;
  tagLookupTable: any;

  constructor(endpoint: string, authToken: string, accountId: string, publicationId: string) {
    super(endpoint, authToken);
    this.publicationId = publicationId;
    this.accountId = accountId;
    this.tagLookupTable = undefined;
  }

  // right now with the logic of default creating notes, duplicate notes are erroring out and not
  // having tags added. not sure if i should fix this, since new tags would automatically create
  // a new note
  async createAnnotation(annotation: Annotation) {
    const annotationVars = this.createAnnotationInput(annotation);
    try {
      const annotationResponse = await this.sdk.CreateAnnotation(annotationVars);
      const createdAnnotation: any = annotationResponse.createAnnotation.annotation;
      const tags = annotation.tags;
      if (tags != undefined && createdAnnotation.annotationId != undefined) {
        const tagResponses = await Promise.all(tags.map(tag => {
          return this.addTagToAnnotation(tag, createdAnnotation.annotationId)
        }));
        createdAnnotation.tags = tagResponses;
      }
      // console.log('create annotation response', annotationResponse);
      return createdAnnotation;
    } catch(error) {
      console.log('catching create annotation error for duplicates');
      const firstError = error.response.errors[0];
      if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_notes"') {
        return {
          duplicateMessage:  'annotation with note text and location already exists',
          duplicateAnnotation: annotation
        }
      }
      if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_highlights"') {
        return {
          duplicateMessage: `annotation with highlight text and location already exists`,
          duplicateAnnotation: annotation
        }
      }
      console.log('unexpected create annotation error message');
      console.log(error);
      throw error;
    }
  }

  stringifyLocation(annotation: Annotation) {
    if ('noteLocation' in annotation) annotation.noteLocation = JSON.stringify(annotation.noteLocation);
    if ('highlightLocation' in annotation) annotation.highlightLocation = JSON.stringify(annotation.highlightLocation);
    return annotation;
  }

  createAnnotationInput(annotation: Annotation): CreateAnnotationMutationVariables {
    const annotationId = this.generateObjectId();
    const annotationCopy = Object.assign({}, annotation);
    delete annotationCopy.tags;
    const stringifedAnnotation = this.stringifyLocation(annotationCopy);
     return {
      inputAnnotation: {
        annotation: {
          ...stringifedAnnotation,
          annotationId,
          publicationId: this.publicationId,
          accountId: this.accountId
        }
      }
    }
  }

  async getAllAnnotationsFromPublication() {
    const allAnnotationsQueryVar: GetAllAnnotationsByPublicationQueryVariables = {
      annotationCondition: {
        publicationId: this.publicationId,
        accountId: this.accountId
      }
    };
    const allAnnotationsRes = await this.sdk.GetAllAnnotationsByPublication(allAnnotationsQueryVar);
    
    return allAnnotationsRes.allAnnotations.nodes
  }

  async updateAnnotationByHighlight(annotation: Annotation) {
    const updateAnnotationByHighlightVar = this.createUpdateAnnotationByHiglightVar(annotation);
    const updateResponse = await this.sdk.UpdateAnnotationByHighlight(updateAnnotationByHighlightVar);
    const updatedAnnotation = updateResponse
      .updateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightText
      .annotation;
    // console.log('updated annotations tags: ', annotation.tags);
    // if (annotation.tags != undefined) {
    //   const tagResponses = await 
    //     Promise.all(annotation.tags.map(tag => this.addTagToAnnotation(tag, updatedAnnotation.annotationId)));
    //   updatedAnnotation['tags'] = tagResponses;
    // }
    return updatedAnnotation;
  }

  createUpdateAnnotationByHiglightVar(annotation: Annotation): UpdateAnnotationByHighlightMutationVariables {
    const stringifedAnnotation = this.stringifyLocation(annotation);
    return {
      updateAnnotation: {
        publicationId: this.publicationId,
        accountId: this.accountId,
        highlightText: stringifedAnnotation.highlightText,
        highlightLocation: stringifedAnnotation.highlightLocation,
        annotationPatch: {
          noteText: stringifedAnnotation.noteText,
          noteLocation: stringifedAnnotation.noteLocation,
        }
      }
    }
  }

  async addTagToAnnotation(tag: string, annotationId: string) {
    const tagId = await this.getTagId(tag);
    try {
      const addTagToAnnotationResponse = await this.sdk.AddTagToAnnotation({annotationId, tagId});
      return addTagToAnnotationResponse.createAnnotationTag.annotationTag;
    } catch (error){
      console.log('catching add annotation tag error for duplicates');
      const firstError = error.response.errors[0];
      if (firstError.message === 'duplicate key value violates unique constraint "annotation_tag_pkey"') {
        return {
          tagId,
          duplicate: `tag ${tag} already exists on annotation ${annotationId}`
        }
      }
      console.log('unexpected add annotation tag error message');
      console.log(error);
      throw error;
    }
  }

  async loadTagLookupTable() {
    const allTagsResponse = await this.sdk.GetAllTagsForAccount({accountId: this.accountId});
    this.tagLookupTable = allTagsResponse.allTags.nodes
      .reduce((acc, tag) => {
        acc[tag.tagName] = tag;
        return acc;
      }, {});
  }

  async getTagId(tag: string) {
    if (typeof this.tagLookupTable !== 'object') await this.loadTagLookupTable();
    // console.log('current lookuptable:\n', this.tagLookupTable);
    // console.log('tag: ', tag, ' lookup:', this.tagLookupTable[tag]);
    if (this.tagLookupTable[tag] == undefined) {
      const tagResponse = await this.findOrCreateTag(tag);
      return tagResponse.tagId
    }
    const matchedTag = this.tagLookupTable[tag];
    return matchedTag.tagId;
  }

  async findOrCreateTag(tag: string) {
    
    const createTagVars = this.createTagInput(tag);
      // this.tagLookupTable[tag] = this.sdk.CreateTag(createTagVars);
    try {
      const { createTag } = await this.sdk.CreateTag(createTagVars)
      this.tagLookupTable[createTag.tag.tagName] = createTag.tag;
      return createTag.tag;
    } catch (error) {
      console.log('catching create tag errors');
      const firstError = error.response.errors[0];
      // console.log(firstError);
      if (firstError.message === 'duplicate key value violates unique constraint "no_duplicate_tags_per_account"') {
        const { tagByAccountIdAndTagName } = await
          this.sdk.GetTagByAccountIdAndName({accountId: this.accountId, tagName: tag});
        console.log('found tag:\n',  tagByAccountIdAndTagName);
        this.tagLookupTable[ tagByAccountIdAndTagName.tagName] =  tagByAccountIdAndTagName;
        return tagByAccountIdAndTagName;
      }
      console.log('unexpected create tag error');
      throw error;
    }
  }

  createTagInput(tag: string): CreateTagMutationVariables {
    const tagId = this.generateObjectId();
    return {
      inputTag: {
        tag: {
          tagId,
          tagName: tag,
          accountId: this.accountId,
        }
      }
    } 
  }
}

