
import {Router} from "express";
import {loginController} from "../controllers/loginController";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {loginValidationModelMiddleware} from "../validation/loginValidationModel";
export const authRouter = Router()

authRouter.post('/login', loginValidationModelMiddleware(), errorMiddleware, loginController)