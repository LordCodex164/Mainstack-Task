import 'dotenv/config';
import App from './app';
import UserAuthenticationController from './controllers/user/user.controller';
import ProductController from './controllers/products/product.controller';

const app = new App(
  [
     new UserAuthenticationController(),
      new ProductController()
  ],
);

app.listen();

const httpApp = app.getServer();

httpApp.get('/api/v1', (req, res) => {
  res.send('Maintack Engineering Test');
}); 

export default app;