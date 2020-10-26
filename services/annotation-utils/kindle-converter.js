const cheerio = require('cheerio');

class kindleConverter {
  
  highlightRegex = /highlight/i;
  noteRegex = /note/i;

  constructor(kindleHTML) {
    this.kindleHTML = kindleHTML;
    this.$ = cheerio.load(this.kindleHTML);
  }

  getBookInfo() {
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

  getBookNotes() {

  }

  parseNoteHeading(heading) {
    // a fiendish regex to match kindle html heading line
    // test examples that work:
    // 笔记 - 位置 25
    // 标注(黄色) - 位置 23
    // Highlight (yellow) - One: If You Want to Understand the Country, Visit McDonald’s > Page 37 · Location 310
    // Highlight (pink) - Page 17 · Location 284
    // 标注(黄色) - One: If You Want to Understand the Country, Visit McDonald’s > 第 38 页·位置 313
    const headingRegex = /(?<noteType>.+) -( (?<chapter>.+) >)?( (?<page>.+)·)?([^0-9]*(?<location>[0-9]+))$/
    const headingMatch = heading.match(headingRegex);
    if (!headingMatch) throw new Error ("Not valid kindle note - metadata does not match");

    let { noteType, chapter, page, location } = headingMatch.groups;
    
    noteType = this.parseNoteType(noteType);
    if (isNaN(location)) throw new Error ('Not valid kindle note - invalid location');
    location = parseInt(location, 10);

    let parsedHeading = {
      noteType,
      location
    };
    
    if (chapter) parsedHeading.chapter = chapter.trim();
    if (page) parsedHeading.page = page.trim();
    
    return parsedHeading;
  }

  parseNoteType(noteType) {
    let tempNoteType = noteType;
    tempNoteType = this.translateNoteType(tempNoteType);
    if (this.highlightRegex.test(tempNoteType)) return 'highlight';
    if (this.noteRegex.test(tempNoteType)) return 'note';
    throw new Error('Not valid kindle note - invalid note type');
  }

  translateNoteType(noteType) {
    let translated = noteType
      .replace(/标注/, "highlight")
      .replace(/笔记/, "note");
    console.log(translated);
    return translated;
  }
}

module.exports.kindleConverter = kindleConverter;