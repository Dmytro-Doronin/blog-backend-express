import {Router} from "express";
import {
    changeBlogsByIdController,
    createNewBlogController, deleteBlogsByIdController,
    getAllBlogsController,
    getBlogsByIdController
} from "../controllers/blogsController";
import {blogName, blogDescription, blogWebsiteUrl} from "../validation/blogsValidationModel";
import {createBlogMiddleware} from "../middleware/blogsMiddleware";

export const blogsRouter = Router()

blogsRouter.get('/', getAllBlogsController)
blogsRouter.post('/', [
    blogName,
    blogDescription,
    blogWebsiteUrl
],createBlogMiddleware, createNewBlogController)

blogsRouter.get('/:id', getBlogsByIdController)
blogsRouter.put('/:id', [
    blogName,
    blogDescription,
    blogWebsiteUrl
], changeBlogsByIdController)
blogsRouter.delete('/:id', deleteBlogsByIdController)