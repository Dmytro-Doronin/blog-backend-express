"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsController_1 = require("../controllers/blogsController");
const blogsValidationModel_1 = require("../validation/blogsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postsValidationModel_1 = require("../validation/postsValidationModel");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', blogsController_1.getAllBlogsController);
exports.blogsRouter.post('/', authMiddleware_1.authMiddleware, (0, blogsValidationModel_1.blogValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, blogsController_1.createNewBlogController);
exports.blogsRouter.post('/:id/posts', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.createPostToBlogModelMiddleware)(), blogsMiddleware_1.errorMiddleware, blogsController_1.createPostToBlogController);
exports.blogsRouter.get('/:id', blogsController_1.getBlogsByIdController);
exports.blogsRouter.get('/:id/posts', blogsController_1.getAllPostInBlogController);
exports.blogsRouter.put('/:id', authMiddleware_1.authMiddleware, (0, blogsValidationModel_1.blogValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, blogsController_1.changeBlogsByIdController);
exports.blogsRouter.delete('/:id', authMiddleware_1.authMiddleware, blogsController_1.deleteBlogsByIdController);
// blogsRouter.delete('/testing/all-data', removeAllDataController)
