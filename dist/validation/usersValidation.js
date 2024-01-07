"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationMiddleware = exports.userEmail = exports.userPassword = exports.userLogin = void 0;
const express_validator_1 = require("express-validator");
exports.userLogin = (0, express_validator_1.body)('login')
    .isString()
    .trim()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('The field must not be less then 3 symbols and more then 10 symbols');
exports.userPassword = (0, express_validator_1.body)('password')
    .isString()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('The field must not be less then 6 symbols and more then 20 symbols');
exports.userEmail = (0, express_validator_1.body)('email')
    .isString()
    .trim()
    // .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$\n')
    .withMessage('Wrong email');
const userValidationMiddleware = () => [exports.userLogin, exports.userPassword, exports.userEmail];
exports.userValidationMiddleware = userValidationMiddleware;
