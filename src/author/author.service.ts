import { db } from '../utils/db.server';

type Author = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

export const getAllAuthors = (): Promise<Author[]> => {
  return db.author.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
  });
};