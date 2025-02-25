import { Router } from "express";
import { getUserInfo, signIn, signUp } from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post('/sign-in', signIn);
authRouter.get('/user-info', verifyToken, getUserInfo);

export default authRouter;