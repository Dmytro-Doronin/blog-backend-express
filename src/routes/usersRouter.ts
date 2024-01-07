import {Router} from "express";
import {createUserController, deleteUserByIdController, getAllUsersController} from "../controllers/usersController";
import {userValidationMiddleware} from "../validation/usersValidation";
import {authMiddleware} from "../middleware/authMiddleware";
import {errorMiddleware} from "../middleware/blogsMiddleware";

export const usersRouter = Router()

usersRouter.post('/', authMiddleware, userValidationMiddleware(), errorMiddleware, createUserController)
usersRouter.get('/', authMiddleware, getAllUsersController)
usersRouter.post('/login', )
usersRouter.delete('/:id', authMiddleware, deleteUserByIdController)