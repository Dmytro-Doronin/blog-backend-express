import {Router} from "express";
import {authMiddlewareWithBearer, customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {createCommentToPostModelMiddleware, likeStatusModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {
    changeCommentByIdController,
    deleteCommentByIdController,
    getCommentByIdController, setLikeStatusController
} from "../controllers/commentsController";


export const commentRouter = Router()

commentRouter.put('/:id', authMiddlewareWithBearer, createCommentToPostModelMiddleware(), errorMiddleware, changeCommentByIdController)
commentRouter.put('/:id/like-status', authMiddlewareWithBearer, likeStatusModelMiddleware(), errorMiddleware, setLikeStatusController)
commentRouter.get('/:id', customAuthMiddlewareWithBearer, getCommentByIdController)
commentRouter.delete('/:id', authMiddlewareWithBearer, deleteCommentByIdController )