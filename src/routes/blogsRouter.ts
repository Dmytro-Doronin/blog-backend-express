import {Router} from "express";
import {
    changeBlogsByIdController,
    createNewBlogController, deleteBlogsByIdController,
    getAllBlogsController,
    getBlogsByIdController
} from "../controllers/blogsController";
import {blogValidationModelMiddleware} from "../validation/blogsValidationModel";
import {blogMiddleware} from "../middleware/blogsMiddleware";
import {body} from "express-validator";
import {authMiddleware} from "../middleware/authMiddleware";

export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogsController)
blogsRouter.post('/',authMiddleware, blogValidationModelMiddleware(),blogMiddleware, createNewBlogController)

blogsRouter.get('/:id', getBlogsByIdController)
blogsRouter.put('/:id',authMiddleware, blogValidationModelMiddleware(),blogMiddleware, changeBlogsByIdController)
blogsRouter.delete('/:id',authMiddleware, deleteBlogsByIdController)