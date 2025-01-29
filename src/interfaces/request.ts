import { Request } from 'express';

export interface RequestObject extends Request {
    user:{
        _id: string;
    }
}