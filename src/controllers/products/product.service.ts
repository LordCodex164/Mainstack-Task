import Product from "../../models/product";
import CreateProductDto from "./createProduct.dto";

class ProductService {

 public productModel = Product

  public async createProduct(product: CreateProductDto, userId: string) {

    const newProduct = this.productModel.create({
        ...product,
        createdBy: userId
    });
    
  }

    public async getAllProducts() {
        const products = await this.productModel.find();
         return products;
    }

    public async getProductById(productId: string) {
        return await this.productModel.findById(productId);
    }

    public async updateProductById(productId: string, product: CreateProductDto) {

       const updatedProduct = await this.productModel.findByIdAndUpdate(productId, product, { new: true });

       return {message: 'Product updated successfully', updatedProduct};

    }

    public async deleteProductById(id: string) {
          try {

            await this.productModel.findByIdAndDelete(id);

            return {message: 'Product deleted successfully'};
            
          } catch (error) {
           
          }
    }

}

export default ProductService;
