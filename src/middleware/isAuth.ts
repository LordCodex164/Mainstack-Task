import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';

export interface RequestObject extends Request {
  user: IUser;
}

export const authenticate = async (req: RequestObject, res: Response, next: NextFunction) : Promise<void | Response> => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET as unknown as string, async (err, decoded: any) => {

    if (err) return res.sendStatus(403);
    next();

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();

  });
};