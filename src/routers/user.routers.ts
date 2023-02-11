import express from 'express';
import type { Request, Response } from 'express';
import { User } from '../types/user.type';

const router = express.Router();

router.post(
  '/signup',
  async (request: Request, response: Response): Promise<User> => {
    return user; //en son yer. buradan devam user auth ve tipleri yazmaya devam
  }
);
