import { db } from '../utils/db.server';
import { User } from '../types/index';

export const registerUser = async (user: User): Promise<User> => {
  const { name, password, isAdmin } = user;

  const userCreate: any = db.user.create({
    data: {
      name,
      password,
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
