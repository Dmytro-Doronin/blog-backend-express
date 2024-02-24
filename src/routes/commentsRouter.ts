import {Router} from "express";
import {authMiddlewareWithBearer, customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {createCommentToPostModelMiddleware, likeStatusModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {CommentsController} from "../controllers/commentsController";
import {container} from "../compositionRoot";

export const commentRouter = Router()

const commentControllerInstance = container.resolve(CommentsController)

commentRouter.get(
    '/:id',
    customAuthMiddlewareWithBearer,
    commentControllerInstance.getCommentByIdController.bind(commentControllerInstance)
)
commentRouter.put(
    '/:id',
    authMiddlewareWithBearer,
    createCommentToPostModelMiddleware(), errorMiddleware, commentControllerInstance.changeCommentByIdController.bind(commentControllerInstance)
)
commentRouter.put(
    '/:id/like-status',
    authMiddlewareWithBearer,
    likeStatusModelMiddleware(), errorMiddleware, commentControllerInstance.setLikeStatusForCommentsController.bind(commentControllerInstance)
)
commentRouter.delete(
    '/:id',
    authMiddlewareWithBearer,
    commentControllerInstance.deleteCommentByIdController.bind(commentControllerInstance)
)