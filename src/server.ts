import 'dotenv/config';
import App from './app';
import UserAuthenticationController from './controllers/user/user.controller';
import ProductController from './controllers/products/product.controller';
import notFound from './exceptions/NotFound';
import express from 'express';

const app = new App(
  [
     new UserAuthenticationController(),
      new ProductController()
  ],
);

app.listen();

const httpApp = app.getServer();

httpApp.get('/', (req, res) => {
  res.send('Maintack Engineering Test');
}); 

export default app;