import { db } from '../../common/utils/db.server';
import { User } from '../../common/types';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

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

  const properties = {
    payload: {
      name: user.name,
      password: user.password,
      email: user.email,
    },
    privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
  };

  const signJwt = jsonwebtoken.sign(properties.payload, properties.privateKey, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
  console.log(signJwt);
  return userCreate;
};
