"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./controllers/user/user.controller"));
const product_controller_1 = __importDefault(require("./controllers/products/product.controller"));
const NotFound_1 = __importDefault(require("./exceptions/NotFound"));
const app = new app_1.default([
    new user_controller_1.default(),
    new product_controller_1.default()
]);
app.listen();
const httpApp = app.getServer();
httpApp.get('/api/v1', (req, res) => {
    res.send('Maintack Engineering Test');
});
httpApp.use(NotFound_1.default);
exports.default = app;
