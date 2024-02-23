import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    changePostByIdController, createCommentForPostController,
    createNewPostController, deletePostByIdController, getAllCommentsForPostController,
    getAllPostsController,
    getPostByIdController, setLikeStatusForPostsController
} from "../controllers/postsControllers";
import {
    createCommentToPostModelMiddleware,
    likeStatusModelMiddleware,
    postsValidationModelMiddleware
} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {authMiddlewareWithBearer, customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";


export const postsRouter = Router()

//basic
postsRouter.get('/',customAuthMiddlewareWithBearer , getAllPostsController)
postsRouter.post('/',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, createNewPostController)

//by id
postsRouter.get('/:id',customAuthMiddlewareWithBearer, getPostByIdController)
postsRouter.put('/:id',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, changePostByIdController)
postsRouter.delete('/:id',authMiddleware, deletePostByIdController)

//comments for post
postsRouter.post('/:id/comments', authMiddlewareWithBearer, createCommentToPostModelMiddleware(), errorMiddleware, createCommentForPostController)
postsRouter.get('/:id/comments',customAuthMiddlewareWithBearer, getAllCommentsForPostController)

//likesForPost
postsRouter.put('/:id/like-status', authMiddlewareWithBearer, likeStatusModelMiddleware(), errorMiddleware, setLikeStatusForPostsController )