import 'dotenv/config';
import App from './app';
import UserAuthenticationController from './controllers/user/user.controller';

// validateEnv();

const app = new App(
  [
     new UserAuthenticationController(),
  ],
);

app.listen();