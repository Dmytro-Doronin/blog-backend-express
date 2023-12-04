"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeBlogsByIdMiddleware = exports.errorMiddleware = void 0;
const express_validator_1 = require("express-validator");
const errorMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req).formatWith(error => {
        switch (error.type) {
            case "field": {
                return {
                    message: error.msg,
                    field: error.path
                };
            }
            default:
                return {
                    message: error.msg,
                    field: "not found"
                };
        }
    });
    if (!errors.isEmpty()) {
        const err = errors.array({ onlyFirstError: true });
        return res.status(400).json({ errorsMessages: err });
    }
    else {
        return next();
    }
};
exports.errorMiddleware = errorMiddleware;
const changeBlogsByIdMiddleware = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req.body);
    if (!errors.isEmpty()) {
        res.status(400).send({ errorsMessages: errors.array() });
    }
    else {
        next();
    }
};
exports.changeBlogsByIdMiddleware = changeBlogsByIdMiddleware;
