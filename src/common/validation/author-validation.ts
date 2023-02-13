import { body } from 'express-validator';

export function validateAuthor() {
  return [body('firstName').isString(), body('lastName').isString()];
}
