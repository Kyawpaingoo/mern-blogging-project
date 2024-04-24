import express from 'express';
import DataController from '../Controllers/DataController.js';
import CheckAuth from '../Middleware/CheckAuth.js';

const DataRouter =  express.Router();

DataRouter.get('/get-tagLangs', DataController.getTagLang);

export default DataRouter;