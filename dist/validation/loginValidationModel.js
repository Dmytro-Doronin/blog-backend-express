"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidationModelMiddleware = exports.password = exports.loginOrEmail = void 0;
const express_validator_1 = require("express-validator");
exports.loginOrEmail = (0, express_validator_1.check)('loginOrEmail')
    .isString();
exports.password = (0, express_validator_1.check)('password')
    .isString();
const loginValidationModelMiddleware = () => [exports.loginOrEmail, exports.password];
exports.loginValidationModelMiddleware = loginValidationModelMiddleware;
