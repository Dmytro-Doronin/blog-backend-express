"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRegistrationConfirmationValidationMiddleware = exports.authRegistrationValidationMiddleware = exports.authCode = exports.authEmail = exports.authPassword = exports.authLogin = void 0;
const express_validator_1 = require("express-validator");
exports.authLogin = (0, express_validator_1.body)('login')
    .isString()
    .trim()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('The field must not be less then 3 symbols and more then 10 symbols');
exports.authPassword = (0, express_validator_1.body)('password')
    .isString()
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('The field must not be less then 6 symbols and more then 20 symbols');
exports.authEmail = (0, express_validator_1.body)('email')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email');
exports.authCode = (0, express_validator_1.body)('code')
    .isString();
const authRegistrationValidationMiddleware = () => [exports.authLogin, exports.authPassword, exports.authEmail];
exports.authRegistrationValidationMiddleware = authRegistrationValidationMiddleware;
const authRegistrationConfirmationValidationMiddleware = () => [exports.authCode];
exports.authRegistrationConfirmationValidationMiddleware = authRegistrationConfirmationValidationMiddleware;
