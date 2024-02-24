"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentRouter = void 0;
const express_1 = require("express");
const authMiddlewareWithBearer_1 = require("../middleware/authMiddlewareWithBearer");
const postsValidationModel_1 = require("../validation/postsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const commentsController_1 = require("../controllers/commentsController");
const compositionRoot_1 = require("../compositionRoot");
exports.commentRouter = (0, express_1.Router)();
const commentControllerInstance = compositionRoot_1.container.resolve(commentsController_1.CommentsController);
exports.commentRouter.get('/:id', authMiddlewareWithBearer_1.customAuthMiddlewareWithBearer, commentControllerInstance.getCommentByIdController.bind(commentControllerInstance));
exports.commentRouter.put('/:id', authMiddlewareWithBearer_1.authMiddlewareWithBearer, (0, postsValidationModel_1.createCommentToPostModelMiddleware)(), blogsMiddleware_1.errorMiddleware, commentControllerInstance.changeCommentByIdController.bind(commentControllerInstance));
exports.commentRouter.put('/:id/like-status', authMiddlewareWithBearer_1.authMiddlewareWithBearer, (0, postsValidationModel_1.likeStatusModelMiddleware)(), blogsMiddleware_1.errorMiddleware, commentControllerInstance.setLikeStatusForCommentsController.bind(commentControllerInstance));
exports.commentRouter.delete('/:id', authMiddlewareWithBearer_1.authMiddlewareWithBearer, commentControllerInstance.deleteCommentByIdController.bind(commentControllerInstance));
