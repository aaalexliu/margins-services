const BookMapper = require('./src/book-mapper').default;
require('dotenv').config();

const testBook = {
  title: 'Dignity: Seeking Respect in Back Row America (English Edition)',
  authors: [ 'Chris Arnade' ]
};

const testNotes = [
  {
    "noteType": "NOTE",
    "location": {
      "kindleLocation": 41,
      "page": "ix",
      "section": "Author’s Note"
    },
    "text": "Test empty note"
  },
  {
    "noteType": "HIGHLIGHT",
    "location": {
      "kindleLocation": 58,
      "page": "1",
      "section": "Introduction"
    },
    "text": "Ifirst walked into the Hunts Point neighborhood of the Bronx because I was told not to. I was told it was too dangerous, too poor, and that I was too white. I was told “nobody goes there for anything other than drugs and prostitutes.” The people directly telling me this were my colleagues (other bankers), my neighbors (other wealthy Brooklynites), and my friends (other academics). All, like me, successful, well-educated people who had opinions on the Bronx but had never really been there."
  },
  {
    "noteType": "NOTE",
    "location": {
      "kindleLocation": 61,
      "page": "1",
      "section": "Introduction"
    },
    "text": "Test empty note 2"
  },
  {
    "noteType": "HIGHLIGHT",
    "location": {
      "kindleLocation": 420,
      "chapter": "One: If You Want to Understand the Country, Visit McDonald’s",
      "page": "46",
      "section": "New York City"
    },
    "text": "We had compassion for those left behind but thought that our job was to provide them an opportunity (no matter how small) to get where we were. We didn’t think about changing our definition of success. It didn’t occur to us that what we valued—getting more education and owning more stuff—wasn’t what everyone else wanted."
  },
  {
    "noteType": "NOTE",
    "location": {
      "kindleLocation": 422,
      "chapter": "One: If You Want to Understand the Country, Visit McDonald’s",
      "page": "46",
      "section": "New York City"
    },
    "text": "different definition of success"
  },
  {
    "noteType": "HIGHLIGHT",
    "location": {
      "kindleLocation": 422,
      "chapter": "One: If You Want to Understand the Country, Visit McDonald’s",
      "page": "46",
      "section": "New York City"
    },
    "text": "In the front row, growing the economy and increasing efficiency were goals most of us, whether Democrat or Republican, put first and agreed on. We believed in free trade, globalization, and deregulation. Our metrics for success became how high the stock market got, how large the profits were, how efficient the company was. If certain communities, towns, and people, suffered in this, it was all for the greater good in the name of progress."
  }
];

const bookMapper = new BookMapper(
  process.env.GRAPHQL_ENDPOINT,
  process.env.GRAPHQL_JWT,
  process.env.ACCOUNT_ID
);
bookMapper.createBook(testBook);