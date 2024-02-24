"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postsControllers_1 = require("../controllers/postsControllers");
const postsValidationModel_1 = require("../validation/postsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const authMiddlewareWithBearer_1 = require("../middleware/authMiddlewareWithBearer");
const compositionRoot_1 = require("../compositionRoot");
exports.postsRouter = (0, express_1.Router)();
const postControllerInstance = compositionRoot_1.container.resolve(postsControllers_1.PostController);
//basic
exports.postsRouter.get('/', authMiddlewareWithBearer_1.customAuthMiddlewareWithBearer, postControllerInstance.getAllPostsController.bind(postControllerInstance));
exports.postsRouter.post('/', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.postsValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, postControllerInstance.createNewPostController.bind(postControllerInstance));
//by id
exports.postsRouter.get('/:id', authMiddlewareWithBearer_1.customAuthMiddlewareWithBearer, postControllerInstance.getPostByIdController.bind(postControllerInstance));
exports.postsRouter.put('/:id', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.postsValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, postControllerInstance.changePostByIdController.bind(postControllerInstance));
exports.postsRouter.delete('/:id', authMiddleware_1.authMiddleware, postControllerInstance.deletePostByIdController.bind(postControllerInstance));
//comments for post
exports.postsRouter.post('/:id/comments', authMiddlewareWithBearer_1.authMiddlewareWithBearer, (0, postsValidationModel_1.createCommentToPostModelMiddleware)(), blogsMiddleware_1.errorMiddleware, postControllerInstance.createCommentForPostController.bind(postControllerInstance));
exports.postsRouter.get('/:id/comments', authMiddlewareWithBearer_1.customAuthMiddlewareWithBearer, postControllerInstance.getAllCommentsForPostController.bind(postControllerInstance));
//likesForPost
exports.postsRouter.put('/:id/like-status', authMiddlewareWithBearer_1.authMiddlewareWithBearer, (0, postsValidationModel_1.likeStatusModelMiddleware)(), blogsMiddleware_1.errorMiddleware, postControllerInstance.setLikeStatusForPostsController.bind(postControllerInstance));
