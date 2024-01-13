"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommentToPostModelMiddleware = exports.createPostToBlogModelMiddleware = exports.postsValidationModelMiddleware = exports.commentContent = exports.postBlogId = exports.postContent = exports.postShortDescription = exports.postTitle = void 0;
const express_validator_1 = require("express-validator");
const blogQuery_1 = require("../repositories/queryRepositories/blogQuery");
exports.postTitle = (0, express_validator_1.body)('title')
    .isString()
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage('The field must not be more then 30 symbols');
exports.postShortDescription = (0, express_validator_1.body)('shortDescription')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('The field must not be more then 100 symbols');
exports.postContent = (0, express_validator_1.body)('content')
    .isString()
    .trim()
    .isLength({ min: 1, max: 1000 }).withMessage('The field must not be more then 1000 symbols');
exports.postBlogId = (0, express_validator_1.body)('blogId')
    .isString()
    .trim()
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blogQuery_1.blogQuery.getBlogByIdInDb(value);
    if (!blog) {
        throw new Error('Incorrect blogId');
    }
    return true;
})).withMessage('Incorrect blogId');
exports.commentContent = (0, express_validator_1.body)('content')
    .isString()
    .isLength({ min: 20, max: 300 }).withMessage('The field must not be more then 300 and less then 20 symbols');
const postsValidationModelMiddleware = () => [exports.postTitle, exports.postShortDescription, exports.postContent, exports.postBlogId];
exports.postsValidationModelMiddleware = postsValidationModelMiddleware;
const createPostToBlogModelMiddleware = () => [exports.postTitle, exports.postShortDescription, exports.postContent];
exports.createPostToBlogModelMiddleware = createPostToBlogModelMiddleware;
const createCommentToPostModelMiddleware = () => [exports.commentContent];
exports.createCommentToPostModelMiddleware = createCommentToPostModelMiddleware;
