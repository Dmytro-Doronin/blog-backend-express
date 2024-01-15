import {Router} from "express";
import {authMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {createCommentToPostModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {
    changeCommentByIdController,
    deleteCommentByIdController,
    getCommentByIdController
} from "../controllers/commentsController";


export const blogsRouter = Router()

blogsRouter.put('/:id', authMiddlewareWithBearer, createCommentToPostModelMiddleware(), errorMiddleware, changeCommentByIdController)
blogsRouter.get('/:id',  getCommentByIdController)
blogsRouter.delete('/:id', authMiddlewareWithBearer, deleteCommentByIdController )