import {Router} from "express";
import {authMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {createCommentToPostModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {
    changeCommentByIdController,
    deleteCommentByIdController,
    getCommentByIdController
} from "../controllers/commentsController";


export const commentRouter = Router()

commentRouter.put('/:id', authMiddlewareWithBearer, createCommentToPostModelMiddleware(), errorMiddleware, changeCommentByIdController)
commentRouter.get('/:id',  getCommentByIdController)
commentRouter.delete('/:id', authMiddlewareWithBearer, deleteCommentByIdController )