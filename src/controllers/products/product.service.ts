import { NextFunction, Request, Response } from "express";
import Product, { IProduct } from "../../models/product";
import CreateProductDto from "./createProduct.dto";
import BadRequestException from "../../exceptions/BadRequestException";
import v2 from '../../utils/cloudinary';

interface File {
  mimetype: string;
  size: number;
  path: string;
  fieldname: string;
  originalname: string;
  encoding: string;
  destination: string;
  filename: string;
  stream: any;
  buffer: any;
}

interface CustomRequest extends Request {
  file?: File;
}

class ProductService {

 public productModel = Product

  public async createProduct(product: CreateProductDto, userId: string): Promise<{message: string, newProduct: IProduct}> {

    const newProduct = await this.productModel.create({
        ...product,
        createdBy: userId
    });

    return {message: 'Product created successfully', newProduct};

  }

  public async getAllProducts() {
    const products = await this.productModel.find();
    return products;
  }


    public async getUserProducts(userId:string) {
        const products = await this.productModel.find(
          {
            createdBy: userId
          }
        );
         return products;
    }

    public async getProduct(productId: string) {
        const product =  await this.productModel.findById(productId);

        if(!product){
            throw new BadRequestException('Product not found');
        }

        return product;
    }

    public async updateProduct(productId: string, product: CreateProductDto) {

      const isProductExist = await this.productModel.findById(productId);

      if(!isProductExist){
          throw new BadRequestException('Product not found');
      }

       const updatedProduct = await this.productModel.findByIdAndUpdate(productId, product, { new: true });

       if(!updatedProduct){
            throw new BadRequestException('Product not updated');
       }

       return {message: 'Product updated successfully', updatedProduct};

    }

    public async deleteProduct(id: string) {
    
            const product = await this.productModel.findByIdAndDelete(id);

            if(!product){
                throw new Error('Product not found');
            }

            return {message: 'Product deleted successfully', product};
            
    }

     public async uploadProductImage (req:CustomRequest, res:Response, next:NextFunction) {

      if(!req.file){
        throw new BadRequestException("Please upload an image file");
      }

      if(!req.file.mimetype.startsWith('image')){
          throw new BadRequestException('Please upload an image file');
      }
      const maxSize = 1024 * 1024;

      if (req.file.size > maxSize) {
          throw new BadRequestException('Please upload image smaller 1MB');
      }
      try{
        v2.uploader.upload(req.file.path, async (error: any, result: any) => {
          if(error) {
            throw new BadRequestException('Error uploading image');
          }
          const {id} = req.params;
          const product = await Product.findByIdAndUpdate(id, {imageUrl: result.secure_url}, {new: true});
          res.status(200).json({product});
        })
        
      }
      catch(error){
          next(error)
      }
  }

}

export default ProductService;
