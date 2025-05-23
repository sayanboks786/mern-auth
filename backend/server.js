import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

connectDB();
app.get('/', (req, res)=>{
    res.send("fuck u");
})

app.listen(PORT, () => {

    console.log(`server is started at: ${PORT}`)
});