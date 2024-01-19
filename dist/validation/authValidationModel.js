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
exports.authEmailResendingValidationMiddleware = exports.authRegistrationConfirmationValidationMiddleware = exports.authRegistrationValidationMiddleware = exports.authEmailResending = exports.authCode = exports.authEmail = exports.authPassword = exports.authLogin = void 0;
const express_validator_1 = require("express-validator");
const userQuery_1 = require("../repositories/queryRepositories/userQuery");
const authQuery_1 = require("../repositories/queryRepositories/authQuery");
exports.authLogin = (0, express_validator_1.body)('login')
    .isString()
    .trim()
    .isLength({ min: 3, max: 10 })
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('The field must not be less then 3 symbols and more then 10 symbols')
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userQuery_1.userQuery.findUserByLoginOrEmail(value);
    if (user) {
        throw new Error('Login already exist');
    }
    return true;
})).withMessage('Login already exist');
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
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = yield userQuery_1.userQuery.findUserByLoginOrEmail(value);
    if (userEmail) {
        throw new Error('Email already exist');
    }
    return true;
})).withMessage('Email already exist')
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email');
exports.authCode = (0, express_validator_1.body)('code')
    .isString()
    .isLength({ min: 1 })
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield authQuery_1.authQuery.getUserByConfirmationCode(value);
    if (user === null || user === void 0 ? void 0 : user.emailConfirmation.isConfirmed) {
        throw new Error('Code already confirmed');
    }
    return true;
})).withMessage('Code already confirmed');
exports.authEmailResending = (0, express_validator_1.body)('email')
    .isString()
    .trim()
    .isLength({ min: 1 })
    .isEmail()
    .custom((value) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = yield userQuery_1.userQuery.findUserByLoginOrEmail(value);
    if (!userEmail) {
        throw new Error('User dos not exist');
    }
    if (userEmail.emailConfirmation.isConfirmed) {
        throw new Error('Email already confirmed');
    }
})).withMessage('Email already confirmed')
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email');
const authRegistrationValidationMiddleware = () => [exports.authLogin, exports.authPassword, exports.authEmail];
exports.authRegistrationValidationMiddleware = authRegistrationValidationMiddleware;
const authRegistrationConfirmationValidationMiddleware = () => [exports.authCode];
exports.authRegistrationConfirmationValidationMiddleware = authRegistrationConfirmationValidationMiddleware;
const authEmailResendingValidationMiddleware = () => [exports.authEmailResending];
exports.authEmailResendingValidationMiddleware = authEmailResendingValidationMiddleware;
