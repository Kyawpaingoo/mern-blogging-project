import express from 'express'

import CheckAuth from '../Middleware/CheckAuth.js';
import { store } from '../Controllers/CommentController.js';

const CommentRouter = express.Router();

CommentRouter.use(CheckAuth);
CommentRouter.post('/article/comment', store);


export default CommentRouter;