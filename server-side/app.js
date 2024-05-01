import express from 'express'
import dotenv from 'dotenv'
import AuthRouter from './Routers/AuthRouter.js';
import mongoose from 'mongoose';
import UserModel from './Models/UserModel.js';
import { errorJson, successJson } from './Controllers/Utils/JsonRes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ArticleRouter from './Routers/ArticleRouter.js';
import fileUpload from 'express-fileupload';
import ProfileRouter from './Routers/ProfileRouter.js';
import DataRouter from './Routers/DataRouter.js';
import ArticleCommentModel from './Models/ArticleCommentModel.js';
import CommentRouter from './Routers/CommentRouter.js';

const app = express();
app.use(fileUpload());
app.use(express.static('public'))
app.use(express.json());
//app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
dotenv.config();

const port = process.env.PORT;
const mongodb = process.env.MONGO_URL;

mongoose.connect(mongodb).then(()=>{
    console.log('database connected');
})

app.use('/api', AuthRouter);
app.use('/api/auth/article', ArticleRouter);
app.use('/api/auth', ProfileRouter);
app.use('/api', DataRouter);
app.use('/api', CommentRouter);

app.get('/success', async (req, res) => {
    res.json(successJson('validated',[{login: 'success'}]));
})

app.get('/error', async (req, res) => {
    res.json(errorJson('validate_error',[{password: 'wrong password'}]));
})


app.get('/test', async (req, res)=>{
    const data = await ArticleCommentModel.create({
        article:'662f3ed02ade07f56dd0fcfb',
        user:'66150f675a6158a3fe36ff89',
        comment:'Thanks for sharing.'
    });

    res.json(data);
})

app.listen(port, ()=> {
    console.log(`server running on: ${port}`);
})


