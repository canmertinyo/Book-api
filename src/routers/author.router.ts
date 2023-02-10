import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthorServices } from '../author/author.service';
import { Injectable } from 'magnodi';
import { validateAuthor } from '../validation';

@Injectable()
export class AuthorRouters {
  authorRouter = express.Router();
  constructor(private readonly authorService: AuthorServices) {
    this.authorRouter.get('/', async (request: Request, response: Response) => {
      try {
        const authors = await this.authorService.getAllAuthors();
        return response.json(authors);
      } catch (error: any) {
        return response.json(error.message);
      }
    });

    this.authorRouter.get(
      ':id',
      async (request: Request, response: Response) => {
        const id: string = request.params.id;
        try {
          const author = await this.authorService.getAuthor(id);
          if (author) {
            return response.json(author);
          }
          return response.json('Author could not be found!');
        } catch (error: any) {
          return response.json(error.message);
        }
      }
    );

    this.authorRouter.post(
      '/',
      validateAuthor(),
      async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.json({ errors: errors.array() });
        }

        const author = request.body;
        const newAuthor = await this.authorService.createAuthor(author);
        return response.json(newAuthor);
      }
    );
    this.authorRouter.put(
      '/:id',

      async (request: Request, response: Response): Promise<any> => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.json({ errors: errors.array });
        }

        const id: string = request.params.id;
        try {
          const author = request.body;
          const updatedAuthor = await this.authorService.updateAuthor(
            author,
            id
          );
          return response.json(updatedAuthor);
        } catch (error: any) {
          return response.json(error.message);
        }
      }
    );
    this.authorRouter.delete(
      '/:id',
      async (request: Request, response: Response) => {
        const id: string = request.params.id;
        try {
          await this.authorService.deleteAuthor(id);
          return response.json({ message: 'author has been deleted!' });
        } catch (error: any) {
          return response.json(error.message);
        }
      }
    );
  }
}
