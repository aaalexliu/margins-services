import cheerio =  require('cheerio');

interface Location {
  kindleLocation: number,
  // page is string because of possible roman numerals
  page?: string,
  section?: string,
  chapter?: string
}

interface NoteHeading {
  location: Location,
  noteType: string,
}

interface Highlight {
  highlightText: string,
  color: string,
  highlightLocation: Location
}

interface Note {
  noteText: string,
  noteLocation: Location
}

type Annotation = Highlight | Note;

interface BookInfo {
  title: string,
  authors: string[]
}

const HIGHLIGHT = 'HIGHLIGHT';
const NOTE = 'NOTE';
const BOOKMARK = 'BOOKMARK';

export class KindleConverter {
  
  highlightRegex = /highlight/i;
  noteRegex = /note/i;
  bookmarkRegex = /bookmark/i;
  highlightColorRegex = /highlight_(?<color>\w+)/
  //page regex captures words because of possible roman numeral pages
  pageRegex = /(page)?\s*(?<pageLocation>\w+)\s*/i
  kindleHTML: any;
  $: cheerio.Root;

  constructor(kindleHTML) {
    this.kindleHTML = kindleHTML;
    this.$ = cheerio.load(this.kindleHTML);
  }

  getBookInfo(): BookInfo {
    const titleElement = this.$('.bookTitle');
    const title = titleElement.text().trim();

    const authorElement = this.$('.authors');
    const authors = authorElement
      .text()
      .split(';')
      .map(author => {
        let name = author.trim();

        // regex to detect if name is in reversed order
        // i.e. lastName, firstName
        const reversedRegex = /(?<lastName>.+), (?<firstName>.+)/;
        const reversedMatch = name.match(reversedRegex);
        if (reversedMatch) {
          const groups = reversedMatch.groups;
          name = `${groups.firstName} ${groups.lastName}`;
        }
        
        return name;
      });
    
    return {
      title,
      authors
    }
  }

  getBookNotes(): Annotation[] {
    const allNoteHeadingElements = this.$("[class$='Heading']");
    let section = '';
    let allAnnotations = [];

    for (let i = 0; i < allNoteHeadingElements.length; i++) {
      let noteHeadingElement = allNoteHeadingElements.eq(i);
      
      // if sectionHeading, skip parseNoteHeading
      const noteClass = noteHeadingElement.attr('class');
      if (noteClass === 'sectionHeading') {
        section = noteHeadingElement.text().trim();
        continue;
      }

      let noteHeading = this.parseNoteHeading(
        noteHeadingElement.text().trim()
      );
      // skip is noteheading is bookmark
      if (noteHeading.noteType === BOOKMARK) continue;
      // console.log('parsed note heading', noteHeading);

      // if kindle notes have section headings, include them in all following notes.
      if (section) noteHeading.location.section = section;
      
      // get note text
      const noteText = noteHeadingElement.next('.noteText')
        .text()
        .trim()
        .replace(/\s\s+/g, ' ');

      // assemble note object
      // const note: Annotation = {
      //   noteType: noteHeading.noteType,
      //   location: noteHeading.location,
      // };
      let annotation: Annotation;

      // check if highlight, then add color
      if (noteHeading.noteType === HIGHLIGHT ) {
        annotation = this.createHighlight(noteHeading, noteHeadingElement, noteText);
        
      } else if (noteHeading.noteType === NOTE ) {
        annotation = this.createNote(noteHeading, noteText);

        annotation['tags'] = this.extractTags(noteText);
        // check if noteType is note. if previous noteType is highlight, assume that note
        // is child note of highlight. if previous noteType is note, assume orphan note and add
        // with current kindle export format, no way to indepedently determine whether
        // noteType note is orphan or child
        let prevNote = allAnnotations.slice(-1)[0];
        if (prevNote && prevNote.highlightText && prevNote.noteText == undefined) {
          Object.assign(prevNote, annotation);
          continue;
        }
      }
      allAnnotations.push(annotation);
    }

    return allAnnotations;
  }

  extractTags(noteText: string) {
    const tagRegex = /(?:(^|\s)@(?<tagName>\w+))/g;
    const tagNames = [...noteText.matchAll(tagRegex)].map(match => match.groups.tagName);
    return tagNames;
  }

  createHighlight(noteHeading, noteHeadingElement, text): Highlight {
    let highlightClass = noteHeadingElement.find("span[class^='highlight_']").attr('class');
    let highlightColorMatch = highlightClass.match(this.highlightColorRegex);
    return {
      highlightLocation: noteHeading.location,
      color: highlightColorMatch.groups.color,
      highlightText: text
    }
  }

  createNote(noteHeading, text): Note {
    return {
      noteLocation: noteHeading.location,
      noteText: text
    }
  }

  parseNoteHeading(heading: string): NoteHeading {
    // console.log('unparsed heading', heading);
    // a fiendish regex to match kindle html heading line
    // test examples that work:
    // 笔记 - 位置 25
    // 标注(黄色) - 位置 23
    // Highlight (yellow) - One: If You Want to Understand the Country, Visit McDonald’s > Page 37 · Location 310
    // Highlight (pink) - Page 17 · Location 284
    // 标注(黄色) - One: If You Want to Understand the Country, Visit McDonald’s > 第 38 页·位置 313

    // found that there is also a bookmark note heading. added both translation and regex.

    // for some reason there are line breaks and multiple spaces in heading. stripping them
    const cleanHeading = heading.replace(/\s\s+/g, ' ');

    const headingRegex = /(?<noteType>.+) -( (?<chapter>.+) >)?( (?<page>.+)·)?([^0-9]*(?<location>[0-9]+))$/
    const headingMatch = cleanHeading.match(headingRegex);
    if (!headingMatch) throw new Error ("Not valid kindle note - metadata does not match");

    let { noteType, chapter, page, location } = headingMatch.groups;
    
    noteType = this.parseNoteType(noteType);
    if (isNaN(Number(location))) throw new Error (`Not valid kindle note - invalid location: ${location}`);
    const kindleLocation = parseInt(location, 10);

    const parsedHeading: NoteHeading = {
      noteType,
      location: {
        kindleLocation
      }
    };
    
    if (chapter) parsedHeading.location.chapter = chapter.trim();
    if (page) parsedHeading.location.page = this.parseNotePage(page.trim());
    
    return parsedHeading;
  }

  parseNoteType(noteType: string): string {
    let tempNoteType = noteType;
    tempNoteType = this.translateNoteType(tempNoteType);
    if (this.highlightRegex.test(tempNoteType)) return HIGHLIGHT;
    if (this.noteRegex.test(tempNoteType)) return NOTE;
    if (this.bookmarkRegex.test(tempNoteType)) return BOOKMARK;
    throw new Error(`Not valid kindle note - invalid note type: ${noteType}`);
  }

  translateNoteType(noteType: string): string {
    let translated = noteType
      .replace(/标注/, HIGHLIGHT)
      .replace(/笔记/, NOTE)
      .replace(/书签/, BOOKMARK);
    // console.log(translated);
    return translated;
  }

  parseNotePage(page: string): string {
    const pageMatch = page.match(this.pageRegex);
    if (!pageMatch.groups) {
      console.log(`page doesn't seem to be correct: ${page}`);
      return page;
    }
    return pageMatch.groups.pageLocation;
  }
}

export default KindleConverter