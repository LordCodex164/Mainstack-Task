import { Request, Response, NextFunction } from 'express';
import BadRequestException from './BadRequestException';

const notFound = (req:Request, res:Response, next:NextFunction) => {
    res.status(404).send("Not Found");
}

export default notFound;