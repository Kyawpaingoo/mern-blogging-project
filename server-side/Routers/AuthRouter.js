import express from 'express'
import { login, register } from '../Controllers/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', login);
AuthRouter.post('/register', register);

export default AuthRouter;