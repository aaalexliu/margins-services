"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KindleConverter = void 0;
const cheerio = require("cheerio");
class KindleConverter {
    constructor(kindleHTML) {
        this.highlightRegex = /highlight/i;
        this.noteRegex = /note/i;
        this.highlightColorRegex = /highlight_(?<color>\w+)/;
        //page regex captures words because of possible roman numeral pages
        this.pageRegex = /(page)?\s*(?<pageLocation>\w+)\s*/i;
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
        };
    }
    getBookNotes() {
        const allNoteHeadingElements = this.$("[class$='Heading']");
        let section = '';
        let allNotes = [];
        for (let i = 0; i < allNoteHeadingElements.length; i++) {
            let noteHeadingElement = allNoteHeadingElements.eq(i);
            // if sectionHeading, skip parseNoteHeading
            const noteClass = noteHeadingElement.attr('class');
            if (noteClass === 'sectionHeading') {
                section = noteHeadingElement.text().trim();
                continue;
            }
            let noteHeading = this.parseNoteHeading(noteHeadingElement.text().trim());
            // console.log('parsed note heading', noteHeading);
            // if kindle notes have section headings, include them in all following notes.
            if (section)
                noteHeading.location.section = section;
            // get note text
            const noteText = noteHeadingElement.next('.noteText')
                .text()
                .trim()
                .replace(/\s\s+/g, ' ');
            // assemble note object
            const note = {
                noteType: noteHeading.noteType,
                location: noteHeading.location,
                text: noteText
            };
            // check if highlight, then add color
            if (note.noteType === 'highlight') {
                let highlightClass = noteHeadingElement.find("span[class^='highlight_']").attr('class');
                let highlightColorMatch = highlightClass.match(this.highlightColorRegex);
                note.highlightColor = highlightColorMatch.groups.color;
            }
            else if (note.noteType === 'note') {
                // check if noteType is note. if previous noteType is highlight, assume that note
                // is child note of highlight. if previous noteType is note, assume orphan note and add
                // with current kindle export format, no way to indepedently determine whether
                // noteType note is orphan or child
                let prevNote = allNotes.slice(-1)[0];
                if (prevNote && prevNote.noteType === 'highlight') {
                    prevNote.note = note;
                    continue;
                }
            }
            allNotes.push(note);
        }
        return allNotes;
    }
    parseNoteHeading(heading) {
        // console.log('unparsed heading', heading);
        // a fiendish regex to match kindle html heading line
        // test examples that work:
        // 笔记 - 位置 25
        // 标注(黄色) - 位置 23
        // Highlight (yellow) - One: If You Want to Understand the Country, Visit McDonald’s > Page 37 · Location 310
        // Highlight (pink) - Page 17 · Location 284
        // 标注(黄色) - One: If You Want to Understand the Country, Visit McDonald’s > 第 38 页·位置 313
        // for some reason there are line breaks and multiple spaces in heading. stripping them
        const cleanHeading = heading.replace(/\s\s+/g, ' ');
        const headingRegex = /(?<noteType>.+) -( (?<chapter>.+) >)?( (?<page>.+)·)?([^0-9]*(?<location>[0-9]+))$/;
        const headingMatch = cleanHeading.match(headingRegex);
        if (!headingMatch)
            throw new Error("Not valid kindle note - metadata does not match");
        let { noteType, chapter, page, location } = headingMatch.groups;
        noteType = this.parseNoteType(noteType);
        if (isNaN(Number(location)))
            throw new Error(`Not valid kindle note - invalid location: ${location}`);
        const kindleLocation = parseInt(location, 10);
        const parsedHeading = {
            noteType,
            location: {
                kindleLocation
            }
        };
        if (chapter)
            parsedHeading.location.chapter = chapter.trim();
        if (page)
            parsedHeading.location.page = this.parseNotePage(page.trim());
        return parsedHeading;
    }
    parseNoteType(noteType) {
        let tempNoteType = noteType;
        tempNoteType = this.translateNoteType(tempNoteType);
        if (this.highlightRegex.test(tempNoteType))
            return 'highlight';
        if (this.noteRegex.test(tempNoteType))
            return 'note';
        throw new Error(`Not valid kindle note - invalid note type: ${noteType}`);
    }
    translateNoteType(noteType) {
        let translated = noteType
            .replace(/标注/, "highlight")
            .replace(/笔记/, "note");
        // console.log(translated);
        return translated;
    }
    parseNotePage(page) {
        const pageMatch = page.match(this.pageRegex);
        if (!pageMatch.groups) {
            console.log(`page doesn't seem to be correct: ${page}`);
            return page;
        }
        return pageMatch.groups.pageLocation;
    }
}
exports.KindleConverter = KindleConverter;
exports.default = KindleConverter;
//# sourceMappingURL=kindle-converter.js.map