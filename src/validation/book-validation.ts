import { body } from 'express-validator';

export function validateBook() {
  return [
    body('title').isString(),
    body('authorId').isString(),
    body('datePublished').isDate().toDate(),
    body('isFiction').isBoolean(),
  ];
}
