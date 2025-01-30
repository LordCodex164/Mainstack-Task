"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = __importDefault(require("../../models/product"));
const BadRequestException_1 = __importDefault(require("../../exceptions/BadRequestException"));
const cloudinary_1 = __importDefault(require("../../utils/cloudinary"));
class ProductService {
    constructor() {
        this.productModel = product_1.default;
    }
    createProduct(product, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.productModel.create(Object.assign(Object.assign({}, product), { createdBy: userId }));
            return { message: 'Product created successfully', newProduct };
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.find();
            return products;
        });
    }
    getUserProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productModel.find({
                createdBy: userId
            });
            return products;
        });
    }
    getProduct(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findById(productId);
            if (!product) {
                throw new BadRequestException_1.default('Product not found');
            }
            return product;
        });
    }
    updateProduct(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            const isProductExist = yield this.productModel.findById(productId);
            if (!isProductExist) {
                throw new BadRequestException_1.default('Product not found');
            }
            const updatedProduct = yield this.productModel.findByIdAndUpdate(productId, product, { new: true });
            if (!updatedProduct) {
                throw new BadRequestException_1.default('Product not updated');
            }
            return { message: 'Product updated successfully', updatedProduct };
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productModel.findByIdAndDelete(id);
            if (!product) {
                throw new BadRequestException_1.default('Product not found');
            }
            return { message: 'Product deleted successfully', product };
        });
    }
    uploadProductImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.file) {
                throw new BadRequestException_1.default("Please upload an image file");
            }
            if (!req.file.mimetype.startsWith('image')) {
                throw new BadRequestException_1.default('Please upload an image file');
            }
            const maxSize = 1024 * 1024;
            if (req.file.size > maxSize) {
                throw new BadRequestException_1.default('Please upload image smaller 1MB');
            }
            try {
                cloudinary_1.default.uploader.upload(req.file.path, (error, result) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        throw new BadRequestException_1.default('Error uploading image');
                    }
                    const { id } = req.params;
                    const product = yield product_1.default.findByIdAndUpdate(id, { imageUrl: result.secure_url }, { new: true });
                    res.status(200).json({ product });
                }));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProductService;
