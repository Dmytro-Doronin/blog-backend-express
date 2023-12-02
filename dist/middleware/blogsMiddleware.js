"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBlogsByIdMiddleware = exports.createBlogMiddleware = void 0;
const express_validator_1 = require("express-validator");
const createBlogMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req.body);
    if (!errors.isEmpty()) {
        res.status(400).send({ errorMessage: errors.array() });
    }
    else {
        next();
    }
};
exports.createBlogMiddleware = createBlogMiddleware;
const changeBlogsByIdMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req.body);
    if (!errors.isEmpty()) {
        res.status(400).send({ errorMessage: errors.array() });
    }
    else {
        next();
    }
};
exports.changeBlogsByIdMiddleware = changeBlogsByIdMiddleware;
