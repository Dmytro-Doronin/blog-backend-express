"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogsController_1 = require("../controllers/blogsController");
const blogsValidationModel_1 = require("../validation/blogsValidationModel");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', blogsController_1.getAllBlogsController);
exports.blogsRouter.post('/', [
    blogsValidationModel_1.blogName,
    blogsValidationModel_1.blogDescription,
    blogsValidationModel_1.blogWebsiteUrl
], blogsMiddleware_1.createBlogMiddleware, blogsController_1.createNewBlogController);
exports.blogsRouter.get('/:id', blogsController_1.getBlogsByIdController);
exports.blogsRouter.put('/:id', [
    blogsValidationModel_1.blogName,
    blogsValidationModel_1.blogDescription,
    blogsValidationModel_1.blogWebsiteUrl
], blogsController_1.changeBlogsByIdController);
exports.blogsRouter.delete('/:id', blogsController_1.deleteBlogsByIdController);
