"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsValidationModel_1 = require("../validation/blogsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postsValidationModel_1 = require("../validation/postsValidationModel");
const compositionRoot_1 = require("../compositionRoot");
const authMiddlewareWithBearer_1 = require("../middleware/authMiddlewareWithBearer");
const blogsController_1 = require("../controllers/blogsController");
exports.blogsRouter = (0, express_1.Router)();
const blogControllerInstance = compositionRoot_1.container.resolve(blogsController_1.BlogController);
exports.blogsRouter.get('/', blogControllerInstance.getAllBlogsController.bind(blogControllerInstance));
exports.blogsRouter.post('/', authMiddleware_1.authMiddleware, (0, blogsValidationModel_1.blogValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, blogControllerInstance.createNewBlogController.bind(blogControllerInstance));
exports.blogsRouter.post('/:id/posts', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.createPostToBlogModelMiddleware)(), blogsMiddleware_1.errorMiddleware, blogControllerInstance.createPostToBlogController.bind(blogControllerInstance));
exports.blogsRouter.get('/:id', blogControllerInstance.getBlogsByIdController.bind(blogControllerInstance));
exports.blogsRouter.get('/:id/posts', authMiddlewareWithBearer_1.customAuthMiddlewareWithBearer, blogControllerInstance.getAllPostInBlogController.bind(blogControllerInstance));
exports.blogsRouter.put('/:id', authMiddleware_1.authMiddleware, (0, blogsValidationModel_1.blogValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, blogControllerInstance.changeBlogsByIdController.bind(blogControllerInstance));
exports.blogsRouter.delete('/:id', authMiddleware_1.authMiddleware, blogControllerInstance.deleteBlogsByIdController.bind(blogControllerInstance));
// blogsRouter.delete('/testing/all-data', removeAllDataController)
