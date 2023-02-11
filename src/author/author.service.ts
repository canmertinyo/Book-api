import { Injectable } from 'magnodi';
import { db } from '../utils/db.server';
import bcrypt from 'bcrypt';

export type Author = {
  id: string;
  firstName?: string;
  lastName?: string;
  createdAt: Date;
};

@Injectable()
export class AuthorServices {
  constructor() {}

  public getAllAuthors = async (): Promise<Author> => {
    const author: any = await db.author.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
    return author;
  };

  public getAuthor = async (idToFind: string): Promise<Author | null> => {
    const findUnique: any = db.author.findUnique({
      where: {
        id: idToFind,
      },
    });
    return findUnique;
  };

  public createAuthor = async (author: Omit<Author, 'id'>): Promise<Author> => {
    const { firstName, lastName } = author;
    const createAuthor: any = db.author.create({
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
    return createAuthor;
  };

  public updateAuthor = async (
    author: Omit<Author, 'id'>,
    id: string
  ): Promise<Author> => {
    const { firstName, lastName } = author;
    const authorUpdate: any = db.author.update({
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
    return authorUpdate;
  };

  public deleteAuthor = async (toDeleteId: string): Promise<Author> => {
    const deleteAuthor: any = await db.author.delete({
      where: {
        id: toDeleteId,
      },
    });
    return deleteAuthor;
  };
}
