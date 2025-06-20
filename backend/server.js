import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));

connectDB();

// api end point
app.get('/', (req, res)=>{
    res.send("fuck u");
})

app.use('/api/auth', authRoute)
app.use("/api/user", userRoute);


app.listen(PORT, () => {

    console.log(`server is started at: ${PORT}`)
});