import { db } from '../utils/db.server';

type BookRead = {
  id: string;
  title: string;
  datePublished: Date;
  isFiction: boolean;
  authorId: string;
};

export const listAllBooks = async (): Promise<BookRead[]> => {
  return db.book.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      authorId: true,
    },
  });
};

export const getBook = async (id: string): Promise<BookRead | null> => {
  return db.book.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      authorId: true,
    },
  });
};

type BookWrite = {
  title: string;
  datePublished: Date;
  authorId: string;
  isFiction: boolean;
};

export const createBook = async (book: BookWrite): Promise<BookRead> => {
  const { title, authorId, datePublished, isFiction } = book;
  const parsedDate: Date = new Date(datePublished);

  return db.book.create({
    data: {
      title,
      authorId,
      isFiction,
      datePublished: parsedDate,
    },
    select: {
      id: true,
      title: true,
      datePublished: true,
      isFiction: true,
      authorId: true,
    },
  });
};

export const deleteBook = async (id: string): Promise<void> => {
  await db.book.delete({
    where: {
      id,
    },
  });
};