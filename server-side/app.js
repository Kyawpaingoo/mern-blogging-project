import express from 'express'
import dotenv from 'dotenv'
import AuthRouter from './Routers/AuthRouter.js';
import mongoose from 'mongoose';
import UserModel from './Models/UserModel.js';

const app = express();
app.use(express.json());
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