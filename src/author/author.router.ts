import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import * as AuthorService from './author.service';

export const authorRouter = express.Router();

authorRouter.get('/', async (request: Request, response: Response) => {
  try {
    const authors = await AuthorService.getAllAuthors();
    return response.status(200).json(authors);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
