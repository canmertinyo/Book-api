import { db } from '../utils/db.server';
import { User } from '../types/index';

export const registerUser = async (user: User): Promise<User> => {
  const { userName, password, isAdmin } = user;

  return db.user.create({
    data: {
      userName,
      password,
      isAdmin,
    },
    select: {
      userName: true,
      password: true,
      isAdmin: true,
      id: true,
    },
  });
};
