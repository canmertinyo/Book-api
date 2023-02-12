import { db } from '../utils/db.server';
import { User } from '../types/index';
import bcrypt from 'bcrypt';

export const registerUser = async (user: User): Promise<User> => {
  const { name, password, isAdmin, email } = user;

  const storeBeforeHash = password;
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
  const userCreate: any = db.user.create({
    data: {
      name,
      password: hashedPassword,
      isAdmin,
      email,
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
