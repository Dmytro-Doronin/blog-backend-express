"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const postsControllers_1 = require("../controllers/postsControllers");
const postsValidationModel_1 = require("../validation/postsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', postsControllers_1.getAllPostsController);
exports.postsRouter.post('/', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.postsValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, postsControllers_1.createNewPostController);
exports.postsRouter.get('/:id', postsControllers_1.getPostByIdController);
exports.postsRouter.put('/:id', authMiddleware_1.authMiddleware, (0, postsValidationModel_1.postsValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, postsControllers_1.changePostByIdController);
exports.postsRouter.delete('/:id', authMiddleware_1.authMiddleware, postsControllers_1.deletePostByIdController);
// postsRouter.delete('/testing/all-data', removeAllDataController)
