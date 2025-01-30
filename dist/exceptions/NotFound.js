"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BadRequestException_1 = __importDefault(require("./BadRequestException"));
const notFound = (req, res, next) => {
    next(new BadRequestException_1.default(`Not Found - ${req.originalUrl}`));
    res.status(404);
};
exports.default = notFound;
