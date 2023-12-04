import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    changePostByIdController,
    createNewPostController, deletePostByIdController,
    getAllPostsController,
    getPostByIdController
} from "../controllers/postsControllers";
import {blogValidationModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";


export const postsRouter = Router()


postsRouter.get('/', getAllPostsController)
postsRouter.post('/',authMiddleware, blogValidationModelMiddleware(), errorMiddleware, createNewPostController)

postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id',authMiddleware, blogValidationModelMiddleware(), errorMiddleware, changePostByIdController)
postsRouter.delete('/:id',authMiddleware, deletePostByIdController)