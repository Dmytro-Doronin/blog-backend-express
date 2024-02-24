import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {PostController} from "../controllers/postsControllers";
import {
    createCommentToPostModelMiddleware,
    likeStatusModelMiddleware,
    postsValidationModelMiddleware
} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {authMiddlewareWithBearer, customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {container} from "../compositionRoot";



export const postsRouter = Router()
const postControllerInstance = container.resolve(PostController)
//basic
postsRouter.get(
    '/',
    customAuthMiddlewareWithBearer ,
    postControllerInstance.getAllPostsController.bind(postControllerInstance)
)
postsRouter.post(
    '/',
    authMiddleware,
    postsValidationModelMiddleware(),
    errorMiddleware,
    postControllerInstance.createNewPostController.bind(postControllerInstance)
)

//by id
postsRouter.get(
    '/:id',
    customAuthMiddlewareWithBearer,
    postControllerInstance.getPostByIdController.bind(postControllerInstance)
)
postsRouter.put(
    '/:id',
    authMiddleware,
    postsValidationModelMiddleware(),
    errorMiddleware,
    postControllerInstance.changePostByIdController.bind(postControllerInstance)
)
postsRouter.delete(
    '/:id',authMiddleware,
    postControllerInstance.deletePostByIdController.bind(postControllerInstance)
)

//comments for post
postsRouter.post(
    '/:id/comments',
    authMiddlewareWithBearer,
    createCommentToPostModelMiddleware(),
    errorMiddleware,
    postControllerInstance.createCommentForPostController.bind(postControllerInstance)
)

postsRouter.get(
    '/:id/comments',
    customAuthMiddlewareWithBearer,
    postControllerInstance.getAllCommentsForPostController.bind(postControllerInstance)
)

//likesForPost
postsRouter.put(
    '/:id/like-status',
    authMiddlewareWithBearer,
    likeStatusModelMiddleware(),
    errorMiddleware, postControllerInstance.setLikeStatusForPostsController.bind(postControllerInstance)
)