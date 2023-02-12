import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export const signJwt = (payLoad: Object, options: SignOptions = {}) => {
  const privateKey = Buffer.from(
    process.env.JWT_PRIVATE_KEY as string,
    'base64'
  ).toString('ascii');

  return jwt.sign(payLoad, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

export const verifyJwt = <T>(token: string): T | null => {
  try {
    const publicKey = Buffer.from(
      process.env.JWT_PUBLIC_KEY as string,
      'base64'
    ).toString('ascii');
    return jwt.verify(token, publicKey) as T;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
