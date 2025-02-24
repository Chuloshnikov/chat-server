import { Router } from "express";
import { signUp } from '../controllers/AuthController.js';

const authRouter = Router();

authRouter.post("/sign-up", signUp);
//authRouter.post('/sign-in', "signIn");
//authRouter.post('/sign-out', "signOut");

export default authRouter;