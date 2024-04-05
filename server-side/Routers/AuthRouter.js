import express from 'express'
import { login } from '../Controllers/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.get('/login', login);

export default AuthRouter;