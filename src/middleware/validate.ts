import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import HttpException from '../exceptions/HttpException';

function validationMiddleware<T>(type: any, skipMissingProperties = false): RequestHandler {
  return (req, res, next) => {
    validate(plainToInstance(type, req.body), {skipMissingProperties})
    .then((errors: ValidationError[]) => {
      if(errors.length > 0){
        const message = errors.map((error: ValidationError | any) => Object.values(error.constraints)).join(', ');
        next(new HttpException(400, message));
      }
      else {
        next();
      }
    })
  }
}

export default validationMiddleware;