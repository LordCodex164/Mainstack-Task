import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const generateToken = (user: IUser): {token: string, expiresIn: number} => {
  return {
    token: jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: '10d' }), 
    expiresIn: 3600
  };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};  