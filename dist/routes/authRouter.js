"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrationLimiter = exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const loginValidationModel_1 = require("../validation/loginValidationModel");
const authValidationModel_1 = require("../validation/authValidationModel");
const authMiddlewareWithBearer_1 = require("../middleware/authMiddlewareWithBearer");
const verifyTokenMiddleware_1 = require("../middleware/verifyTokenMiddleware");
const express_rate_limit_1 = require("express-rate-limit");
exports.authRouter = (0, express_1.Router)();
exports.registrationLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 1000,
    limit: 5,
    message: 'Too many requests from this IP, please try again later.',
});
exports.authRouter.get('/me', authMiddlewareWithBearer_1.authMiddlewareWithBearer, authController_1.meController);
exports.authRouter.post('/login', exports.registrationLimiter, (0, loginValidationModel_1.loginValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.authController);
exports.authRouter.post('/logout', verifyTokenMiddleware_1.verifyTokenMiddleware, authController_1.logoutController);
exports.authRouter.post('/refresh-token', verifyTokenMiddleware_1.verifyTokenMiddleware, authController_1.refreshTokenController);
exports.authRouter.post('/registration', exports.registrationLimiter, (0, authValidationModel_1.authRegistrationValidationMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.registrationController);
exports.authRouter.post('/registration-confirmation', exports.registrationLimiter, (0, authValidationModel_1.authRegistrationConfirmationValidationMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.registrationConfirmationController);
exports.authRouter.post('/registration-email-resending', exports.registrationLimiter, (0, authValidationModel_1.authEmailResendingValidationMiddleware)(), blogsMiddleware_1.errorMiddleware, authController_1.emailResendingController);
