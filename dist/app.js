"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = __importDefault(require("./middleware/errorMiddleware"));
dotenv_1.default.config();
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        this.connectToDatabase();
        this.intitializeMiddlewares();
        this.inititializeControllers(controllers);
        this.initializeErrorHandling();
    }
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    intitializeMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
    }
    getServer() {
        return this.app;
    }
    closeServer() {
        return this.app.off('close', () => {
            console.log('Server closed');
        });
    }
    inititializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use(`/api/v1`, controller.router);
        });
    }
    connectToDatabase() {
        mongoose_1.default.connect(process.env.MONGO_URI)
            .then(() => console.log('Connected to MongoDB'))
            .catch(err => console.error('Could not connect to MongoDB', err));
    }
    initializeErrorHandling() {
        this.app.use(errorMiddleware_1.default);
    }
}
exports.default = App;
