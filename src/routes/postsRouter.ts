import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    changePostByIdController, createCommentForPostController,
    createNewPostController, deletePostByIdController, getAllCommentsForPostController,
    getAllPostsController,
    getPostByIdController
} from "../controllers/postsControllers";
import {createCommentToPostModelMiddleware, postsValidationModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {authMiddlewareWithBearer, customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";


export const postsRouter = Router()

//basic
postsRouter.get('/', getAllPostsController)
postsRouter.post('/',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, createNewPostController)

//by id
postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, changePostByIdController)
postsRouter.delete('/:id',authMiddleware, deletePostByIdController)

//comments for post
postsRouter.post('/:id/comments', authMiddlewareWithBearer, createCommentToPostModelMiddleware(), errorMiddleware, createCommentForPostController)
postsRouter.get('/:id/comments',customAuthMiddlewareWithBearer, getAllCommentsForPostController)
