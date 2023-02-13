import express from 'express';
import { validationResult } from 'express-validator';
import type { Request, Response } from 'express';
import * as BookService from '../features/book/book.service';
import { validateBook } from '../common/validation/index';

export const bookRouter = express.Router();

bookRouter.get('/', async (request: Request, response: Response) => {
  try {
    const books = await BookService.listAllBooks();
    return response.json(books);
  } catch (error: any) {
    return response.json(error.message);
  }
});
bookRouter.get('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;

  try {
    const book = await BookService.getBook(id);
    if (book) {
      return response.json(book);
    }
  } catch (error: any) {
    return response.json(error.message);
  }
});

bookRouter.post(
  '/',
  validateBook(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    const book = await request.body;

    if (!errors.isEmpty()) {
      return response.json({ errors: errors.array() });
    }

    const newBook = await BookService.createBook(book);
    return response.json(newBook);
  }
);

bookRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: string = request.params.id;
  try {
    await BookService.deleteBook(id);
    return response.json('Book was successfully deleted');
  } catch (error: any) {
    return response.json(error.message);
  }
});
