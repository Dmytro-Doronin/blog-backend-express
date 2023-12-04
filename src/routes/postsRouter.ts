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
postsRouter.post('/', postsValidationModelMiddleware(), errorMiddleware, createNewPostController)

postsRouter.get('/:id', getPostByIdController)
postsRouter.put('/:id', postsValidationModelMiddleware(), errorMiddleware, changePostByIdController)
postsRouter.delete('/:id', deletePostByIdController)
// postsRouter.delete('/testing/all-data', removeAllDataController)