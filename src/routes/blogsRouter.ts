import {Router} from "express";
import {
    changeBlogsByIdController,
    createNewBlogController, deleteBlogsByIdController,
    getAllBlogsController,
    getBlogsByIdController
} from "../controllers/blogsController";
import {blogValidationModelMiddleware} from "../validation/blogsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {body} from "express-validator";
import {authMiddleware} from "../middleware/authMiddleware";
import {removeAllDataController} from "../controllers/deleteController";

export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogsController)
blogsRouter.post('/',authMiddleware, blogValidationModelMiddleware(),errorMiddleware, createNewBlogController)

blogsRouter.get('/:id', getBlogsByIdController)
blogsRouter.put('/:id',authMiddleware, blogValidationModelMiddleware(),errorMiddleware, changeBlogsByIdController)
blogsRouter.delete('/:id',authMiddleware, deleteBlogsByIdController)
blogsRouter.delete('/testing/all-data', removeAllDataController)