import express from 'express'
import { login, register, checkAuth, logout } from '../Controllers/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/login', login);
AuthRouter.post('/register', register);
AuthRouter.get('/checkAuth', checkAuth);
AuthRouter.post('/logout', logout);
AuthRouter.post('/logout', logout);

export default AuthRouter;