import { Router } from "express";
import { getUserInfo, signIn, signUp, updateProfile } from '../controllers/AuthController.js';
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRouter = Router();

authRouter.post("/sign-up", signUp);
authRouter.post('/sign-in', signIn);
authRouter.get('/user-info', verifyToken, getUserInfo);
authRouter.post("/update-profile", verifyToken, updateProfile);

export default authRouter;