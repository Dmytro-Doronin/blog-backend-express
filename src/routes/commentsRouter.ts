import {Router} from "express";
import {authMiddlewareWithBearer, customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {createCommentToPostModelMiddleware, likeStatusModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {
    changeCommentByIdController,
    deleteCommentByIdController,
    getCommentByIdController, setLikeStatusForCommentsController
} from "../controllers/commentsController";


export const commentRouter = Router()

commentRouter.get('/:id', customAuthMiddlewareWithBearer, getCommentByIdController)
commentRouter.put('/:id', authMiddlewareWithBearer, createCommentToPostModelMiddleware(), errorMiddleware, changeCommentByIdController)
commentRouter.put('/:id/like-status', authMiddlewareWithBearer, likeStatusModelMiddleware(), errorMiddleware, setLikeStatusForCommentsController)
commentRouter.delete('/:id', authMiddlewareWithBearer, deleteCommentByIdController )