"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
const express_rate_limit_1 = require("express-rate-limit");
const rateLimitMiddleware = (req, res, next) => {
    const registrationLimiter = (0, express_rate_limit_1.rateLimit)({
        windowMs: 10 * 1000,
        limit: 5,
        message: 'Too many requests from this IP, please try again later.',
    });
    return registrationLimiter;
};
exports.rateLimitMiddleware = rateLimitMiddleware;
