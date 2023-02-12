import { db } from '../utils/db.server';
import { User } from '../types/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (user: User): Promise<User> => {
  const { name, password, isAdmin, email, createdAt } = user;

  const storeBeforeHash = password; //stored old version to use in next steps.
  const parsedCreateDate = new Date(createdAt);
  console.log(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const checkUserNameExists = await db.user.findUnique({
    where: {
      name,
    },
  });
  if (checkUserNameExists) {
    throw new Error('username already exists!');
  }

  //will add here jwt do not forgot!!!!
  const userCreate: any = db.user.create({
    data: {
      name,
      password: hashedPassword,
      isAdmin,
      email,
      createdAt: parsedCreateDate,
    },
    select: {
      name: true,
      password: true,
      isAdmin: true,
      id: true,
      email: true,
    },
  });
  return userCreate;
};
