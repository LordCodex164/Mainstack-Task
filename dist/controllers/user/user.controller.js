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
const WrongCredientialsException_1 = __importDefault(require("../../exceptions/WrongCredientialsException"));
const validate_1 = __importDefault(require("../../middleware/validate"));
const user_dto_1 = __importDefault(require("./user.dto"));
const authUserService_1 = __importDefault(require("./authUserService"));
const login_dto_1 = __importDefault(require("./login.dto"));
class UserAuthenticationController {
    constructor() {
        this.path = '/auth';
        this.router = (0, express_1.Router)();
        this.authenticationService = new authUserService_1.default();
        this.registration = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const userData = request.body;
            console.log("user", userData);
            try {
                const { cookie, user, token } = yield this.authenticationService.register(userData);
                response.setHeader('Set-Cookie', [cookie]);
                response.status(200).json({ data: user });
            }
            catch (error) {
                next(error);
            }
        });
        this.loggingIn = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            const logInData = request.body;
            try {
                const { newUserObject, token } = yield this.authenticationService.login(logInData);
                response.setHeader('Set-Cookie', [token]);
                response.send(newUserObject);
            }
            catch (error) {
                next(new WrongCredientialsException_1.default());
            }
        });
        this.loggingOut = (request, response) => {
            response.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
            response.send(200);
        };
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validate_1.default)(user_dto_1.default), this.registration);
        this.router.post(`${this.path}/login`, (0, validate_1.default)(login_dto_1.default), this.loggingIn);
        this.router.post(`${this.path}/logout`, this.loggingOut);
    }
}
exports.default = UserAuthenticationController;
