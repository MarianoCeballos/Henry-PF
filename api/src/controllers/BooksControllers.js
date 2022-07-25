const axios = require('axios');
const { Books } = require('../db');
const { Op } = require('sequelize');
const maxResults = 40;
const term = [
  'lord of the rings',
  'tales',
  'circus',
  'england',
  'pirates',
  'harry potter and',
  'To Kill',
  'a Mockingbird',
  'Jaws',
  'Don Quixote',
  'Moby-Dick',
  'Northern Lights',
  'a',
  'el prin',
];

async function getImage(industryID) {
  let isbn = '';

  if (industryID && industryID.length > 1) {
    if (industryID[0].type.includes('10')) {
      isbn = industryID[0].identifier;
    } else if (industryID[1].type.includes('10')) {
      isbn = industryID[1].identifier;
    }
  }
  if (isbn) {
    return `https://images-na.ssl-images-amazon.com/images/P/${isbn}.01._SX180_SCLZZZZZZZ_.jpg`;
  } else
    return 'https://www.angeldelsoto.es/wp-content/uploads/leather-book-preview.png';
}

let BooksModel = {
  getBooksApi: async function () {
    try {
      for (let i = 0; i < term.length; i++) {
        let api = (
          await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${
              term[i]
            }&printType=books&maxResults=${maxResults}&startIndex=${i * 40}`
          )
        ).data;

        api.items &&
          api.items.map(async (b) => {
            const industryID = b.volumeInfo.industryIdentifiers
              ? b.volumeInfo.industryIdentifiers
              : [];
            const img = await getImage(
              industryID.length > 0 ? industryID : null
            );

            await Books.findOrCreate({
              where: {
                title: b.volumeInfo.title,
                description: b.volumeInfo.description
                  ? b.volumeInfo.description
                  : 'No description',
                price: b.saleInfo.listPrice
                  ? b.saleInfo.listPrice.amount
                  : (Math.random() * 100).toFixed(2),

                image: img,
                authors: b.volumeInfo.authors ? b.volumeInfo.authors : [],
                categories: b.volumeInfo.categories
                  ? b.volumeInfo.categories
                  : [],
                publisher: b.volumeInfo.publisher
                  ? b.volumeInfo.publisher
                  : 'NO PUBLISHER',
                publishedDate: b.volumeInfo.publishedDate
                  ? b.volumeInfo.publishedDate
                  : 'NO DATE',
                pageCount: b.volumeInfo.pageCount ? b.volumeInfo.pageCount : 0,
                rating: b.volumeInfo.averageRating
                  ? b.volumeInfo.averageRating
                  : 0,
                language: b.volumeInfo.language
                  ? b.volumeInfo.language
                  : 'NO INFO',
              },
            });
          });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  },
  getBooks: async function () {
    const foundBooks = await Books.findAll();
    if (foundBooks.length > 0) {
      return foundBooks;
    } else {
      return undefined;
    }
  },

  getBookByTitle: async function (title) {
    const bookFound = await Books.findAll({
      where: {
        title: {
          [Op.iLike]: '%' + title + '%',
        },
      },
    });
    if (bookFound.length === 0) {
      return undefined;
    }

    return bookFound;
  },

  getBookById: async function (ID) {
    const bookFound = await Books.findByPk(ID);
    bookFound ? bookFound : undefined;
    return bookFound;
  },
};
module.exports = BooksModel;
