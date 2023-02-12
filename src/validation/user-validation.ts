import { body } from 'express-validator';

export function userValidate() {
  return [
    body('name')
      .isString()
      .isLength({ min: 4, max: 50 })
      .withMessage(
        'Please provide a valid username. And keep it between 4-50 characters.'
      ),
    body('password').isString().withMessage('Please provide a valid password!'),
    body('isAdmin').isBoolean().withMessage('You must select one'),
    body('email')
      .isEmail()
      .withMessage('Please provide a valid mail : example@email.com'),
    body('createdAt').isDate().toDate(),
    body('updatedAt').isDate().toDate(),
    body('isAuthor').isBoolean().withMessage('You must select one'),
  ];
}
