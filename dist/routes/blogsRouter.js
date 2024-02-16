"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsValidationModel_1 = require("../validation/blogsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postsValidationModel_1 = require("../validation/postsValidationModel");
const compositionRoot_1 = require("../compositionRoot");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', compositionRoot_1.blogControllerInstance.getAllBlogsController.bind(compositionRoot_1.blogControllerInstance));
exports.blogsRouter.post('/', authMiddleware_1.authMiddleware, (0, blogsValidationModel_1.blogValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, compositionRoot_1.blogControllerInstance.createNewBlogController.bind(compositionRoot_1.blogControllerInstance));
exports.blogsRouter.post('/:id/posts', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.createPostToBlogModelMiddleware)(), blogsMiddleware_1.errorMiddleware, compositionRoot_1.blogControllerInstance.createPostToBlogController.bind(compositionRoot_1.blogControllerInstance));
exports.blogsRouter.get('/:id', compositionRoot_1.blogControllerInstance.getBlogsByIdController.bind(compositionRoot_1.blogControllerInstance));
exports.blogsRouter.get('/:id/posts', compositionRoot_1.blogControllerInstance.getAllPostInBlogController.bind(compositionRoot_1.blogControllerInstance));
exports.blogsRouter.put('/:id', authMiddleware_1.authMiddleware, (0, blogsValidationModel_1.blogValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, compositionRoot_1.blogControllerInstance.changeBlogsByIdController.bind(compositionRoot_1.blogControllerInstance));
exports.blogsRouter.delete('/:id', authMiddleware_1.authMiddleware, compositionRoot_1.blogControllerInstance.deleteBlogsByIdController.bind(compositionRoot_1.blogControllerInstance));
// blogsRouter.delete('/testing/all-data', removeAllDataController)
