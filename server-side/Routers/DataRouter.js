import express from 'express';
import DataController from '../Controllers/DataController.js';
import CheckAuth from '../Middleware/CheckAuth.js';

const DataRouter =  express.Router();

DataRouter.get('/get-tagLangs', DataController.getTagLang);
DataRouter.get('/get-homeArticle', DataController.getHomeArticle);
DataRouter.get('/get-trendingArticle', DataController.getTrendingArticle);
DataRouter.get('/get-MostArticle', DataController.getMostArticle);
DataRouter.get('/get-MostCommentArticle', DataController.getMostCommentArticle);
DataRouter.get('/articles', DataController.getAllArticle);
DataRouter.get('/articles/:id',DataController.getArticleDetail);
DataRouter.post('/articles/like',DataController.artileLike);
DataRouter.post('/articles/unlike',DataController.artileUnLike);

export default DataRouter;