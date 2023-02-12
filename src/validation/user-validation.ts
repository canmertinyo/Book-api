import { body } from 'express-validator';

export function userValidate() {
  return [
    body('name').isString().isLength({ min: 4, max: 50 }),
    body('password').isString(),
    body('isAdmin').isBoolean(),
    body('email').isEmail(),
  ];
}
