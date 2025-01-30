import { Router, Request, Response, NextFunction, RequestHandler, RequestParamHandler } from 'express';
import validationMiddleware from '../../middleware/validate';
import CreateProductDto from './createProduct.dto';
import ProductService from './product.service';
import { authenticate } from '../../middleware/isAuth';
import { IUser } from '../../models/user';
import Upload from '../../interfaces/upload';

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
        this.router.get(
        `${this.path}`, 
        authenticate as unknown as RequestHandler,
        this.getUserProducts as unknown as RequestHandler);

        this.router.get(
        `${this.path}/:id`, 
        authenticate as unknown as RequestHandler,
        this.getProductById);

        this.router.post(
        `${this.path}/create`, 
        authenticate as unknown as RequestHandler,
        validationMiddleware(CreateProductDto), 
        this.createProduct as unknown as RequestHandler);

        this.router.patch(
        `${this.path}/:id`, 
        authenticate as unknown as RequestHandler,
        validationMiddleware(CreateProductDto, true), 
        this.updateProduct);

        this.router.delete(
        `${this.path}/:id`, 
        authenticate as unknown as RequestHandler,
        this.deleteProduct);

        this.router.post(
        `${this.path}/upload/:id`,
        authenticate as unknown as RequestHandler,
        Upload.single('image') as unknown as RequestHandler,
        this.uploadProductImage as unknown as RequestHandler
        )
    }

    private getAllProducts = async (request:Request, response:Response) => {
        const products = await this.productControllerService.getAllProducts();
        response.status(200).json({message: "All User products", data: products});
    }

    private getUserProducts = async (req:RequestObject, response:Response) => {
        const products = await this.productControllerService.getUserProducts(req.user._id as unknown as string);
        response.status(200).json({message: "All User products", data: products});
    }

    private getProductById = async (request:Request, response:Response) => {
        const {id} = request.params;
        const product = await this.productControllerService.getProduct(id);
        response.status(200).json({data: product});
    }

    private createProduct = async (request: RequestObject, response:Response) => {
       const {message, newProduct} =  await this.productControllerService.createProduct(request.body, request.user._id as unknown as string);
         response.status(201).json({message, data: newProduct});
    }

    private updateProduct = async (request:Request, response:Response) => {
        const {id} = request.params;
        const {message, updatedProduct} = await this.productControllerService.updateProduct(id, request.body);
        response.status(200).json({message, data: updatedProduct});
    }

    private deleteProduct = async (request:Request, response:Response) => {
        const {id} = request.params;
        const {message, product} = await this.productControllerService.deleteProduct(id);
        response.status(200).json({message, data: product});
    }

    public uploadProductImage = async (request:Request, response:Response, next: NextFunction) => {
         console.log(request.file, "request");
        await this.productControllerService.uploadProductImage(request, response, next);
    }
}

export default ProductController;