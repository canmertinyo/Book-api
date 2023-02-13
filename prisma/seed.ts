import { db } from '../src/common/utils/db.server';
import { Author, Book, User } from '../src/common/types';

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
  await Promise.all(
    getAllUsers().map((users) => {
      db.user.create({
        data: {
          name: users.name,
          password: users.password,
          isAdmin: users.isAdmin,
          email: users.email,
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

function getAllUsers(): Array<User> {
  //just testing. Your data will not be shown in here
  return [
    {
      name: 'canmertinyo',
      password: '123456',
      isAdmin: true,
      email: 'squalcan@gmail.com',
    },
    {
      name: 'cancevik',
      password: '123456',
      isAdmin: true,
      email: 'canccevik@outlook.com',
    },
    {
      name: 'master-of-puppets',
      password: '123123312',
      isAdmin: true,
      email: 'metallica@gmail.com',
    },
  ];
}
