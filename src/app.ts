import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/errorMiddleware';
import Controller from './interfaces/controller.interface';
dotenv.config();


class App {

  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.connectToDatabase();
    this.intitializeMiddlewares();
    this.inititializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  public intitializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private inititializeControllers(controllers: any[]){
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    })
    controllers.forEach((controller) => {
      this.app.use(`/api/`, controller.router);
    })

  }

  private connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI as string)
   .then(() => console.log('Connected to MongoDB'))
   .catch(err => console.error('Could not connect to MongoDB', err));
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware as unknown as express.ErrorRequestHandler);
  }

}

export default App;

