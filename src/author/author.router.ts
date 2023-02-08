import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { AuthorServices } from './author.service';
import { Injectable } from 'magnodi';

@Injectable()
export class AuthorRouters {
  authorRouter = express.Router();
  constructor(public authorService: AuthorServices) {
    this.authorRouter.get('/', async (request: Request, response: Response) => {
      try {
        const authors = await this.authorService.getAllAuthors();
        return response.status(200).json(authors);
      } catch (error: any) {
        return response.status(500).json(error.message);
      }
    });

    this.authorRouter.get(
      ':id',
      async (request: Request, response: Response) => {
        const id: string = request.params.id;
        try {
          const author = await this.authorService.getAuthor(id);
          if (author) {
            return response.status(200).json(author);
          }
          return response.status(404).json('Author could not be found!');
        } catch (error: any) {
          return response.status(500).json(error.message);
        }
      }
    );

    this.authorRouter.post(
      '/',
      body('firstName').isString(),
      body('lastName').isString(),
      async (request: Request, response: Response) => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          response.status(400).json({ errors: errors.array() });
        }
        try {
          const author = request.body;
          const newAuthor = await this.authorService.createAuthor(author);
          return response.status(201).json(newAuthor);
        } catch (error: any) {
          return response.status(500).json(error.message);
        }
      }
    );
    this.authorRouter.put(
      '/:id',
      body('firstName').isString(),
      body('lastName').isString(),
      async (request: Request, response: Response): Promise<any> => {
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
          return response.status(400).json({ errors: errors.array });
        }

        const id: string = request.params.id;
        try {
          const author = request.body;
          const updatedAuthor = await this.authorService.updateAuthor(
            author,
            id
          );
          return response.status(200).json(updatedAuthor);
        } catch (error: any) {
          return response.status(500).json(error.message);
        }
      }
    );
    this.authorRouter.delete(
      '/:id',
      async (request: Request, response: Response) => {
        const id: string = request.params.id;
        try {
          await this.authorService.deleteAuthor(id);
          return response
            .status(200)
            .json({ message: 'author has been deleted!' });
        } catch (error: any) {
          return response.status(500).json(error.message);
        }
      }
    );
  }
}
