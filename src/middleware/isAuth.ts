import { Request, Response, NextFunction } from 'express';
import User, { IUser } from '../models/user';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import { verifyToken } from '../utils/jwt';

export interface RequestObject extends Request {
  user: IUser;
}

export const authenticate = async (req: RequestObject, res: Response, next: NextFunction) : Promise<void | Response> => {
  const Authtoken = req.headers['authorization']?.split(' ')[1];

  if (!Authtoken) return res.sendStatus(401);

  const decoded = verifyToken(Authtoken);

   const user = await User.findById(decoded.id);

    if (!user) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
};