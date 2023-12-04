"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsValidationModelMiddleware = exports.postBlogId = exports.postContent = exports.postShortDescription = exports.postTitle = void 0;
const express_validator_1 = require("express-validator");
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
    .isString();
const postsValidationModelMiddleware = () => [exports.postTitle, exports.postShortDescription, exports.postContent, exports.postBlogId];
exports.postsValidationModelMiddleware = postsValidationModelMiddleware;
