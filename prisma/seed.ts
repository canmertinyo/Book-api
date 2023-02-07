import { db } from '../src/utils/db.server';
import { Author, Book } from '../src/types/index';

async function seed() {
  await Promise.all(
    getAuthors().map((author) => {
      return db.author.create({
        data: {
          firstName: author.firstName,
          lastName: author.lastName,
        },
      });
    })
  );
  const author = await db.author.findFirst({
    where: {
      firstName: 'can',
    },
  });

  await Promise.all(
    getBooks().map((book) => {
      const { title, isFiction, datePublished } = book;
      return db.book.create({
        data: {
          title,
          isFiction,
          datePublished,
          authorId: author!.id,
        },
      });
    })
  );
}

seed();

function getAuthors(): Array<Author> {
  return [
    {
      firstName: 'can',
      lastName: 'pelek',
    },
    {
      firstName: 'can',
      lastName: 'çevik',
    },
  ];
}

function getBooks(): Array<Book> {
  return [
    {
      title: 'sapiens',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'robin hood',
      isFiction: false,
      datePublished: new Date(),
    },
    {
      title: 'The wild animals',
      isFiction: false,
      datePublished: new Date(),
    },
  ];
}
