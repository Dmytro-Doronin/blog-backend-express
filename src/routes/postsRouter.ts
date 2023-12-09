import {Router} from "express";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    changePostByIdController,
    createNewPostController, deletePostByIdController,
    getAllPostsController,
    getPostByIdController
} from "../controllers/postsControllers";
import { postsValidationModelMiddleware} from "../validation/postsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {removeAllDataController} from "../controllers/deleteController";


export const postsRouter = Router()


postsRouter.get('/', getAllPostsController)
postsRouter.post('/',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, createNewPostController)

postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id',authMiddleware, postsValidationModelMiddleware(), errorMiddleware, changePostByIdController)
postsRouter.delete('/:id',authMiddleware, deletePostByIdController)
// postsRouter.delete('/testing/all-data', removeAllDataController)