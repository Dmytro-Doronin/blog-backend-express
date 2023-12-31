import {Router} from "express";
import {
    changeBlogsByIdController,
    createNewBlogController, createPostToBlogController, deleteBlogsByIdController,
    getAllBlogsController, getAllPostInBlogController,
    getBlogsByIdController
} from "../controllers/blogsController";
import {blogValidationModelMiddleware} from "../validation/blogsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {body} from "express-validator";
import {authMiddleware} from "../middleware/authMiddleware";
import {removeAllDataController} from "../controllers/deleteController";
import {createPostToBlogModelMiddleware} from "../validation/postsValidationModel";

export const blogsRouter = Router()


blogsRouter.get('/', getAllBlogsController)
blogsRouter.post('/',authMiddleware, blogValidationModelMiddleware(),errorMiddleware, createNewBlogController)
blogsRouter.post('/:id/posts',authMiddleware, createPostToBlogModelMiddleware(),errorMiddleware, createPostToBlogController)
blogsRouter.get('/:id', getBlogsByIdController)
blogsRouter.get('/:id/posts', getAllPostInBlogController)

blogsRouter.put('/:id',authMiddleware, blogValidationModelMiddleware(),errorMiddleware, changeBlogsByIdController)
blogsRouter.delete('/:id',authMiddleware, deleteBlogsByIdController)
// blogsRouter.delete('/testing/all-data', removeAllDataController)