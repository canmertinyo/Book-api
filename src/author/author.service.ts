import { Injectable } from 'magnodi';
import { db } from '../utils/db.server';

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
};

@Injectable()
export class AuthorServices {
  constructor() {}

  public getAllAuthors = (): Promise<Author[]> => {
    return db.author.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
  };

  public getAuthor = (idToFind: string): Promise<Author | null> => {
    return db.author.findUnique({
      where: {
        id: idToFind,
      },
    });
  };

  public createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const { firstName, lastName } = author;
    return db.author.create({
      data: {
        firstName,
        lastName,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: false,
      },
    });
  };

  public updateAuthor = async (
    author: Omit<Author, 'id'>,
    id: string
  ): Promise<Author> => {
    const { firstName, lastName } = author;
    return db.author.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: false,
      },
    });
  };

  public deleteAuthor = async (toDeleteId: string): Promise<Author> => {
    return await db.author.delete({
      where: {
        id: toDeleteId,
      },
    });
  };
}
