import express from 'express'
import { all, destroy, edit, getArticleByUsername, getTagLanguage, store, update } from '../Controllers/ArticleController.js';
import CheckAuth from '../Middleware/CheckAuth.js';

const ArticleRouter = express.Router();

ArticleRouter.use(CheckAuth);

ArticleRouter.get('/tag-language', getTagLanguage);
ArticleRouter.get('/:name', getArticleByUsername);
ArticleRouter.post('/', store);
ArticleRouter.get('/', all);
ArticleRouter.get('/:id', edit);
ArticleRouter.post('/:id', update);
ArticleRouter.delete('/:id', destroy);


export default ArticleRouter;