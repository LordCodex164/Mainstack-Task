import { Request, Response, NextFunction } from 'express';
import BadRequestException from './BadRequestException';

const notFound = (req:Request, res:Response, next:NextFunction) => {
    next(new BadRequestException(`Not Found - ${req.originalUrl}`));
    res.status(404).send("Not Found");
}

export default notFound;