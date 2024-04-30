import express from 'express';
import DataController from '../Controllers/DataController.js';
import CheckAuth from '../Middleware/CheckAuth.js';

const DataRouter =  express.Router();

DataRouter.get('/get-tagLangs', DataController.getTagLang);
DataRouter.get('/get-homeArticle', DataController.getHomeArticle);
DataRouter.get('/get-trendingArticle', DataController.getTrendingArticle);
DataRouter.get('/get-MostArticle', DataController.getMostArticle);
DataRouter.get('/articles', DataController.getAllArticle);
DataRouter.get('/articles/:id',DataController.getArticleDetail);

export default DataRouter;