import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    changePostByIdController, createCommentForPostController,
    createNewPostController, deletePostByIdController,
    getAllPostsController,
    getPostByIdController
} from "../controllers/postsControllers";
import {createCommentToPostModelMiddleware, postsValidationModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {removeAllDataController} from "../controllers/deleteController";


export const postsRouter = Router()

//basic
postsRouter.get('/', getAllPostsController)
postsRouter.post('/',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, createNewPostController)

//by id
postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, changePostByIdController)
postsRouter.delete('/:id',authMiddleware, deletePostByIdController)
// postsRouter.delete('/testing/all-data', removeAllDataController)

//comments for post
postsRouter.post('/:id/comments', createCommentToPostModelMiddleware(), errorMiddleware, createCommentForPostController)
