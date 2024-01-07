import {loginController} from "../controllers/usersController";
import {Router} from "express";
export const authRouter = Router()

authRouter.post('/login', loginController)