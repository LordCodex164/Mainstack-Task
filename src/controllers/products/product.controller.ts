import { Router, Request, Response, NextFunction, RequestHandler, RequestParamHandler } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import validationMiddleware from '../../middleware/validate';
import { ParsedQs } from 'qs';
import CreateProductDto from './createProduct.dto';
import ProductService from './product.service';
import WrongCredentialsException from '../../exceptions/WrongCredientialsException';
import UserNotFoundException from "../../exceptions/UserFoundException";
import UserWithThatEmailAlreadyExistsException from "../../exceptions/UserWithThatEmailAlreadyExistsException";
import { authenticate } from '../../middleware/isAuth';
import { IUser } from '../../models/user';

export interface RequestObject extends Request {
  user: IUser;
}

class ProductController {
    public path = '/products';
    public router = Router();
    public productControllerService = new ProductService();

    constructor(){
        this.initializeRoutes();
    }



    private initializeRoutes(){
        this.router.get(`${this.path}`, this.getAllProducts);
        this.router.get(`${this.path}/:id`, this.getProductById);
        this.router.post(`${this.path}`, validationMiddleware(CreateProductDto), this.createProduct);
        this.router.patch(`${this.path}/:id`, validationMiddleware(CreateProductDto, true), this.updateProduct);
        this.router.delete(`${this.path}/:id`, this.deleteProduct);
    }

    private getAllProducts = async (request:Request, response:Response) => {
        response.send('All products');
        await this.productControllerService.getAllProducts();
    }

    private getProductById = async (request:Request, response:Response) => {
        const {id} = request.params;
        await this.productControllerService.getProductById(id);
        response.send('Product with id ' + request.params.id);
    }

    private createProduct = async (request: Request, response:Response) => {

        await this.productControllerService.createProduct(request.body.data, request.user._id);

    }

    private updateProduct = async (request:Request, response:Response) => {
        response.send('Product with id ' + request.params.id + ' updated');
    }

    private deleteProduct = async (request:Request, response:Response) => {
        response.send('Product with id ' + request.params.id + ' deleted');
    }
}