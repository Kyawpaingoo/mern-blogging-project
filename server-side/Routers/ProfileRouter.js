import express from 'express'
import { changePassword } from '../Controllers/ProfileController.js';
import CheckAuth from '../Middleware/CheckAuth.js';


const ProfileRouter = express.Router();
ProfileRouter.use(CheckAuth);
ProfileRouter.post('/changePassword', changePassword);


export default ProfileRouter;