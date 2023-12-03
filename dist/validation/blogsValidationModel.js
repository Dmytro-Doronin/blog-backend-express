"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidationModelMiddleware = exports.blogWebsiteUrl = exports.blogDescription = exports.blogName = void 0;
const express_validator_1 = require("express-validator");
exports.blogName = (0, express_validator_1.check)('name')
    .isString()
    .trim()
    .isLength({ min: 1, max: 15 }).withMessage('The field must not be more then 15 symbols');
exports.blogDescription = (0, express_validator_1.check)('description')
    .isString()
    .trim()
    .isLength({ min: 1, max: 500 }).withMessage('The field must not be more then 500 symbols');
exports.blogWebsiteUrl = (0, express_validator_1.check)('websiteUrl')
    .isString()
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage('The field must not be more then 100 symbols')
    .matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    .withMessage('Incorrect websiteUrl');
const blogValidationModelMiddleware = () => [exports.blogName, exports.blogDescription, exports.blogWebsiteUrl];
exports.blogValidationModelMiddleware = blogValidationModelMiddleware;
