import express from 'express'
import dotenv from 'dotenv'
import AuthRouter from './Routers/AuthRouter.js';
import mongoose from 'mongoose';
import UserModel from './Models/UserModel.js';
import { errorJson, successJson } from './Controllers/Utils/JsonRes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(cors({origin:"http://localhost:5173", credentials: true}));
dotenv.config();

const port = process.env.PORT;
const mongodb = process.env.MONGO_URL;

mongoose.connect(mongodb).then(()=>{
    console.log('database connected');
})

app.use('/api', AuthRouter);

app.listen(port, ()=> {
    console.log(`server running on: ${port}`);
})

app.get('/test', async (req, res)=>{
    const data = await UserModel.find({});
    // await UserModel.create({
    //     name: 'User One',
    //     email: 'userone@gmail.com',
    //     password: 'userone'
    // })
    res.json(data);
});

app.get('/success', async (req, res) => {
    res.json(successJson('validated',[{login: 'success'}]));
})

app.get('/error', async (req, res) => {
    res.json(errorJson('validate_error',[{password: 'wrong password'}]));
})