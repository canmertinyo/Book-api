import { db } from '../utils/db.server';
import { User } from '../types/index';
import bcrypt from 'bcrypt';

export const registerUser = async (user: User): Promise<User> => {
  const { name, password, isAdmin } = user;

  const hashedPassword = await bcrypt.hash(password, 10);

  const userCreate: any = db.user.create({
    data: {
      name,
      password: hashedPassword,
      isAdmin,
    },
    select: {
      name: true,
      password: true,
      isAdmin: true,
      id: true,
    },
  });
  return userCreate;
};
