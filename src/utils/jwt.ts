import jwt from 'jsonwebtoken';
import { IUser } from '../models/user';

export const generateToken = (user: any): {token: string, expiresIn: number} => {
  return {
    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' }), 
    expiresIn: 3600
  };
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};