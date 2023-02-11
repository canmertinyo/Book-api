import express from 'express';
import type { Request, Response } from 'express';
import { registerUser } from '../user/user.service';

export const registerRouter = express.Router();

registerRouter.post('/', async (request: Request, response: Response) => {
  const user = await request.body;

  const newUser = await registerUser(user);
  return response.json({ createdUser: newUser });
});
