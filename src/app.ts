import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import errorMiddleware from './middleware/errorMiddleware';
import Controller from './interfaces/controller.interface';
dotenv.config();


class App {

  private app: express.Application;

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

  private intitializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  public getServer() {
    return this.app;
  }

  public closeServer() {
    return this.app.off(
      'close',
      () => {
        console.log('Server closed');
      }
    );
  }

  private inititializeControllers(controllers: any[]){
    controllers.forEach((controller) => {
      this.app.use(`/api/v1`, controller.router);
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

