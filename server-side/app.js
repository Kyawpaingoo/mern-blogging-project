import express from 'express'
import dotenv from 'dotenv'
import AuthRouter from './Routers/AuthRouter.js';

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use('/api', AuthRouter);

app.listen(port, ()=> {
    console.log(`server running on: ${port}`);
})