const { KindleConverter } = require('./build/kindle-converter');
const fs = require('fs');

const myArgs = process.argv.slice(2);
if (myArgs === undefined || myArgs.length === 0) console.log('using default test html');

const bookFileLocation = myArgs[0] ? myArgs[0]
  : './sample-kindle-exports/dignity-chinese.html';

const bookHTML = fs.readFileSync(bookFileLocation, 'utf8');

const converter = new KindleConverter(bookHTML);

console.log(
  converter.getBookInfo()
);

console.log("test chinese note headng",
  converter.parseNoteHeading("标注(黄色) - One: If You Want to Understand the Country, Visit McDonald’s > 第 38 页·位置 313")
)

console.log("test short chinese note heading",
  converter.parseNoteHeading("笔记 - 位置 25")
);

console.log("test english note heading",
  converter.parseNoteHeading("Highlight (pink) - Page 17 · Location 284")
);

console.log("test full english note heading",
  converter.parseNoteHeading("Highlight (yellow) - One: If You Want to Understand the Country, Visit McDonald’s > Page 37 · Location 310")
);

console.log("test note parsing");
let parsedNotes = converter.getBookNotes();
fs.writeFileSync(
  './output-parsed/dignity-chinese-notes.json',
  JSON.stringify(parsedNotes, null, 2),
  'utf8'
);

