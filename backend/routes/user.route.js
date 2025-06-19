import express, { Router } from 'express';
import userAuth from '../middleware/userAuth.middleware.js';
import { getUserData } from '../controllers/user.controller.js';

const userRoute = express.Router();

userRoute.get("/get-user-data", userAuth, getUserData);


export default userRoute;