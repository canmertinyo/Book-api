import express from 'express';
import type { Request, Response } from 'express';
import { registerUser } from '../features/user/user.service';
import { userValidate } from '../common/validation';
import { validationResult } from 'express-validator';

export const registerRouter = express.Router();

registerRouter.post(
  '/',
  userValidate(),
  async (request: Request, response: Response) => {
    const user = await request.body;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.json({ errors: errors.array() });
      throw new Error('validation error!');
    }

    const newUser = await registerUser(user);
    return response.json({ createdUser: newUser });
  }
);
