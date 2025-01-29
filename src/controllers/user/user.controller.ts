import * as bcrypt from 'bcryptjs';
import { Request, Response, NextFunction, Router } from 'express';
import * as jwt from 'jsonwebtoken';
import WrongCredentialsException from '../../exceptions/WrongCredientialsException';
import Controller from '../../interfaces/controller.interface';
// import DataStoredInToken from '../interfaces/dataStoredInToken';
// import TokenData from '../interfaces/tokenData.interface';
import validationMiddleware from '../../middleware/validate';
import CreateUserDto from './user.dto';
import User from './user.interface';
import userModel from '../../models/user';
import AuthenticationService from './authUserService';
import LogInDto from './login.dto';

class UserAuthenticationController implements Controller {

  public path = '/auth';
  public router = Router();
  public authenticationService = new AuthenticationService();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), this.registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), this.loggingIn);
    this.router.post(`${this.path}/logout`, this.loggingOut);
  }

  private registration = async (request: Request, response: Response, next: NextFunction) => {
    const userData: CreateUserDto = request.body;
    console.log("user", userData)
    try {
      const {
        cookie,
        user,
      } = await this.authenticationService.register(userData);
      response.setHeader('Set-Cookie', [cookie]);
      response.send(user);
    } catch (error) {
      next(error);
    }
  }

  private loggingIn = async (request: Request, response: Response, next: NextFunction) => {
    const logInData: LogInDto = request.body;
    try{
      const {
        user,
        token
      } = await this.authenticationService.login(logInData);
      response.setHeader('Set-Cookie', [token]);
      response.send(user);
    }
    catch(error){
      next(new WrongCredentialsException());
    }
  }

  private loggingOut = (request: Request, response: Response) => {
    response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
    response.send(200);
  }
}

export default UserAuthenticationController;