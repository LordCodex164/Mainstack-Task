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
const express_1 = require("express");
const validate_1 = __importDefault(require("../../middleware/validate"));
const createProduct_dto_1 = __importDefault(require("./createProduct.dto"));
const product_service_1 = __importDefault(require("./product.service"));
const isAuth_1 = require("../../middleware/isAuth");
const upload_1 = __importDefault(require("../../interfaces/upload"));
class ProductController {
    constructor() {
        this.path = '/products';
        this.router = (0, express_1.Router)();
        this.productControllerService = new product_service_1.default();
        this.getAllProducts = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productControllerService.getAllProducts();
            response.status(200).json({ message: "All User products", data: products });
        });
        this.getUserProducts = (req, response) => __awaiter(this, void 0, void 0, function* () {
            const products = yield this.productControllerService.getUserProducts(req.user._id);
            response.status(200).json({ message: "All User products", data: products });
        });
        this.getProductById = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const product = yield this.productControllerService.getProduct(id);
            response.status(200).json({ data: product });
        });
        this.createProduct = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { message, newProduct } = yield this.productControllerService.createProduct(request.body, request.user._id);
            response.status(201).json({ message, data: newProduct });
        });
        this.updateProduct = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { message, updatedProduct } = yield this.productControllerService.updateProduct(id, request.body);
            response.status(200).json({ message, data: updatedProduct });
        });
        this.deleteProduct = (request, response) => __awaiter(this, void 0, void 0, function* () {
            const { id } = request.params;
            const { message, product } = yield this.productControllerService.deleteProduct(id);
            response.status(200).json({ message, data: product });
        });
        this.uploadProductImage = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(request.file, "request");
            yield this.productControllerService.uploadProductImage(request, response, next);
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/all`, isAuth_1.authenticate, this.getAllProducts);
        this.router.get(`${this.path}`, isAuth_1.authenticate, this.getUserProducts);
        this.router.get(`${this.path}/:id`, isAuth_1.authenticate, this.getProductById);
        this.router.post(`${this.path}/create`, isAuth_1.authenticate, (0, validate_1.default)(createProduct_dto_1.default), this.createProduct);
        this.router.patch(`${this.path}/:id`, isAuth_1.authenticate, (0, validate_1.default)(createProduct_dto_1.default, true), this.updateProduct);
        this.router.delete(`${this.path}/:id`, isAuth_1.authenticate, this.deleteProduct);
        this.router.post(`${this.path}/upload/:id`, isAuth_1.authenticate, upload_1.default.single('image'), this.uploadProductImage);
    }
}
exports.default = ProductController;
