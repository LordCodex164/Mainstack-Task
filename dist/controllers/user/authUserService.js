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
const user_1 = __importDefault(require("../../models/user"));
const jwt_1 = require("../../utils/jwt");
const UserFoundException_1 = __importDefault(require("../../exceptions/UserFoundException"));
const UserWithThatEmailAlreadyExistsException_1 = __importDefault(require("../../exceptions/UserWithThatEmailAlreadyExistsException"));
class AuthUserService {
    constructor() {
        this.userModel = user_1.default;
    }
    register(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield this.userModel.findOne({ email: userData.email })) {
                    throw new UserWithThatEmailAlreadyExistsException_1.default(userData.email);
                }
                const newUser = yield this.userModel.create(Object.assign({}, userData));
                let newUserObject;
                newUserObject = newUser.toObject();
                if (newUserObject) {
                    delete newUserObject.password;
                    delete newUserObject.__v;
                    delete newUserObject._id;
                }
                const token = (0, jwt_1.generateToken)(newUser);
                const cookie = this.createCookie({ token: token.token, expiresIn: token.expiresIn });
                return { user: newUserObject, token: token.token, cookie };
            }
            catch (err) {
                throw new Error(err);
            }
        });
    }
    createCookie(tokenData) {
        return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userModel.findOne({ email: data.email });
            if (!user) {
                throw new UserFoundException_1.default(data.email);
            }
            let newUserObject;
            newUserObject = user.toObject();
            if (newUserObject) {
                delete newUserObject.password;
                delete newUserObject.__v;
                delete newUserObject._id;
            }
            const isPasswordMatching = yield user.comparePassword(data.password);
            if (!isPasswordMatching) {
                throw new Error('Invalid password');
            }
            const token = (0, jwt_1.generateToken)(user);
            return { newUserObject, token: token.token };
        });
    }
}
exports.default = AuthUserService;
