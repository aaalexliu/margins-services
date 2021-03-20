/*! For license information please see app.js.LICENSE.txt */
module.exports=(()=>{var __webpack_modules__={35688:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=r(n(23480)),o=n(67060),a=n(1722),s=r(n(4209)),c=n(94853),l=n(17661),p=new i.default.S3,u=function(){const e=process.env.PRIVATE_KEY;return s.default.sign({"cognito:groups":["margins_lambda"]},e,{algorithm:"RS256",issuer:"www.margins.me",audience:"www.margins.me/graphql",expiresIn:"1h",keyid:"8676a8a1-9b9b-4a91-9016-063569707baf"})}();t.lambdaHandler=async(e,t,n)=>{const r=e.Records[0].s3.bucket.name;console.log("s3 event record"),console.log(e.Records[0].s3);const i=decodeURIComponent(e.Records[0].s3.object.key.replace(/\+/g," "));let s;try{const e={Bucket:r,Key:i};s=(await p.getObject(e).promise()).Body}catch(e){return void console.log(e)}console.log(s);const d=await o.simpleParser(s),f=d.from.value[0].address,h=new c.AccountMapper(process.env.GRAPHQL_ENDPOINT,u),m=await h.findAccountByEmail(f);if(console.log("find account response: \n",m),null==m)return void console.log("no account found, aborting");const g=function(e){if(e.attachments){const t=e.attachments.filter((e=>"text/html"===e.contentType));if(t.length)return t[0].content.toString("utf8")}return new Error("No valid HTML attachment")}(d),v=new a.KindleConverter(g),y=await v.getBookInfo();console.log("book info",y);const b=new c.PublicationMapper(process.env.GRAPHQL_ENDPOINT,u,m.accountId),x=await b.findOrCreatePublication(y),_=new c.AnnotationMapper(process.env.GRAPHQL_ENDPOINT,u,m.accountId,x.publicationId);let E=await _.getAllAnnotationsFromPublication();console.log("current annotations count: ",E.length),E=l.parseAnnotationsFromGraphql(E);const T=v.getBookNotes(),{annotationsToCreate:w,annotationsToUpdate:S,annotationsToAddTags:A}=l.compareAnnotations(E,T);console.log("create annotations count:",w.length),console.log("update annotations count: ",S.length),console.log("annotations to add tags count",A.length);const O=w.map((e=>_.createAnnotation(e))),k=S.map((e=>_.updateAnnotationByHighlight(e))),N=A.flatMap((e=>e.tags.map((t=>_.addTagToAnnotation(t,e.annotationId)))));let I,C,D;try{I=await Promise.all(O),C=await Promise.all(k),D=await Promise.all(N)}catch(e){console.log(e)}}},17661:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.parseAnnotationsFromGraphql=t.compareAnnotations=void 0;var r=n(13673);Object.defineProperty(t,"compareAnnotations",{enumerable:!0,get:function(){return r.compareAnnotations}}),Object.defineProperty(t,"parseAnnotationsFromGraphql",{enumerable:!0,get:function(){return r.parseAnnotationsFromGraphql}})},13673:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.compareAnnotations=t.parseAnnotationsFromGraphql=void 0;const i=r(n(72449));function o(e){return{highlightLocation:e.highlightLocation,highlightText:e.highlightText}}t.parseAnnotationsFromGraphql=function(e){return e.map((e=>{const t=function(e){var t,n;let r=null===(n=null===(t=e.tagsByAnnotationTagAnnotationIdAndTagId)||void 0===t?void 0:t.nodes)||void 0===n?void 0:n.map((e=>e.tagName));return{annotationId:e.annotationId,highlightLocation:null!=e.highlightLocation?JSON.parse(e.highlightLocation):null,highlightText:null!=e.highlightText?e.highlightText:null,noteLocation:null!=e.noteLocation?JSON.parse(e.noteLocation):null,noteText:null!=e.noteText?e.noteText:null,tags:r||[]}}(e);return null===t.highlightLocation&&null===t.highlightText?null:t})).filter((e=>e))},t.compareAnnotations=function(e,t){const n=[],r=[],a=[];for(let s=0,c=t.length;s<c;s++){let c=o(t[s]),l=-1;for(let t=0,n=e.length;t<n;t++){const n=o(e[t]);if(i.default(c,n,{strict:!0})){l=t;break}}if(-1===l)n.push(t[s]);else{const[n]=e.splice(l,1);n.noteText!=t[s].noteText&&r.push({annotationId:n.annotationId,...t[s]}),null!=t[s].tags&&(n.tags=t[s].tags,a.push(n))}}return{annotationsToCreate:n,annotationsToUpdate:r,annotationsToAddTags:a}}},90942:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getSdk=t.CreateAnnotationForLocationTestingDocument=t.ConnectAuthorToPublicationDocument=t.GetAuthorByFullNameDocument=t.GetPublicationByAccountAndTitleDocument=t.CreatePublicationDocument=t.CreateAuthorDocument=t.AddTagToAnnotationDocument=t.GetTagByAccountIdAndNameDocument=t.GetAllTagsForAccountDocument=t.CreateTagDocument=t.UpdateAnnotationByHighlightDocument=t.GetAllAnnotationsByPublicationDocument=t.CreateAnnotationDocument=t.GetAccountByEmailDocument=t.GetAccountByAccountIdDocument=t.CreateAccountDocument=void 0;const i=n(75649),o=r(n(35717));t.CreateAccountDocument=o.default`
    mutation CreateAccount($accountInput: CreateAccountInput!) {
  createAccount(input: $accountInput) {
    __typename
    account {
      accountId
      email
      createdAt
      emailVerified
      firstName
      updatedAt
      lastName
    }
  }
}
    `,t.GetAccountByAccountIdDocument=o.default`
    query GetAccountByAccountId($accountId: UUID!) {
  accountByAccountId(accountId: $accountId) {
    accountId
    email
    emailVerified
    group
  }
}
    `,t.GetAccountByEmailDocument=o.default`
    query GetAccountByEmail($email: String!) {
  accountByEmail(email: $email) {
    accountId
    email
  }
}
    `,t.CreateAnnotationDocument=o.default`
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
    `,t.GetAllAnnotationsByPublicationDocument=o.default`
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
    `,t.UpdateAnnotationByHighlightDocument=o.default`
    mutation UpdateAnnotationByHighlight($updateAnnotation: UpdateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightTextInput!) {
  __typename
  updateAnnotationByPublicationIdAndAccountIdAndHighlightLocationAndHighlightText(
    input: $updateAnnotation
  ) {
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
    `,t.CreateTagDocument=o.default`
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
    `,t.GetAllTagsForAccountDocument=o.default`
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
    `,t.GetTagByAccountIdAndNameDocument=o.default`
    query GetTagByAccountIdAndName($accountId: UUID!, $tagName: String!) {
  tagByAccountIdAndTagName(accountId: $accountId, tagName: $tagName) {
    tagId
    tagName
  }
}
    `,t.AddTagToAnnotationDocument=o.default`
    mutation AddTagToAnnotation($annotationId: String!, $tagId: String!) {
  __typename
  createAnnotationTag(
    input: {annotationTag: {annotationId: $annotationId, tagId: $tagId}}
  ) {
    annotationTag {
      annotationId
      tagId
    }
  }
}
    `,t.CreateAuthorDocument=o.default`
    mutation CreateAuthor($authorInput: CreateAuthorInput!) {
  createAuthor(input: $authorInput) {
    __typename
    author {
      authorId
      fullName
    }
  }
}
    `,t.CreatePublicationDocument=o.default`
    mutation CreatePublication($publicationInput: CreatePublicationInput!) {
  createPublication(input: $publicationInput) {
    __typename
    publication {
      createdAt
      id
      updatedAt
      publicationId
      title
      accountId
    }
  }
}
    `,t.GetPublicationByAccountAndTitleDocument=o.default`
    query GetPublicationByAccountAndTitle($accountId: UUID!, $title: String!) {
  __typename
  publicationByAccountIdAndTitle(accountId: $accountId, title: $title) {
    publicationId
    title
    accountId
    additionalMeta
  }
}
    `,t.GetAuthorByFullNameDocument=o.default`
    query GetAuthorByFullName($fullName: String!) {
  __typename
  authorByFullName(fullName: $fullName) {
    authorId
    fullName
  }
}
    `,t.ConnectAuthorToPublicationDocument=o.default`
    mutation ConnectAuthorToPublication($authorAndPublication: CreatePublicationAuthorInput!) {
  __typename
  createPublicationAuthor(input: $authorAndPublication) {
    publicationAuthor {
      authorId
      publicationId
    }
  }
}
    `,t.CreateAnnotationForLocationTestingDocument=o.default`
    mutation CreateAnnotationForLocationTesting($inputAnnotation: CreateAnnotationInput!) {
  __typename
  createAnnotation(input: $inputAnnotation) {
    annotation {
      annotationId
      highlightLocation
      highlightText
      noteText
      noteLocation
    }
  }
}