import {Router} from "express";
import {blogValidationModelMiddleware} from "../validation/blogsValidationModel";
import {errorMiddleware} from "../middleware/blogsMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import {createPostToBlogModelMiddleware} from "../validation/postsValidationModel";
import {container} from "../compositionRoot";
import {customAuthMiddlewareWithBearer} from "../middleware/authMiddlewareWithBearer";
import {BlogController} from "../controllers/blogsController";

export const blogsRouter = Router()

const blogControllerInstance = container.resolve(BlogController)

blogsRouter.get('/', blogControllerInstance.getAllBlogsController.bind(blogControllerInstance))
blogsRouter.post('/',authMiddleware, blogValidationModelMiddleware(),errorMiddleware, blogControllerInstance.createNewBlogController.bind(blogControllerInstance))
blogsRouter.post('/:id/posts',authMiddleware, createPostToBlogModelMiddleware(),errorMiddleware, blogControllerInstance.createPostToBlogController.bind(blogControllerInstance))
blogsRouter.get('/:id', blogControllerInstance.getBlogsByIdController.bind(blogControllerInstance))
blogsRouter.get('/:id/posts',customAuthMiddlewareWithBearer, blogControllerInstance.getAllPostInBlogController.bind(blogControllerInstance))

blogsRouter.put('/:id',authMiddleware, blogValidationModelMiddleware(),errorMiddleware, blogControllerInstance.changeBlogsByIdController.bind(blogControllerInstance))
blogsRouter.delete('/:id',authMiddleware, blogControllerInstance.deleteBlogsByIdController.bind(blogControllerInstance))
// blogsRouter.delete('/testing/all-data', removeAllDataController)