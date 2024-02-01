"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
// import {videoRouter} from "./routes/videoRouter";
const blogsRouter_1 = require("./routes/blogsRouter");
const deleteRouter_1 = require("./routes/deleteRouter");
const postsRouter_1 = require("./routes/postsRouter");
const usersRouter_1 = require("./routes/usersRouter");
const authRouter_1 = require("./routes/authRouter");
const commentsRouter_1 = require("./routes/commentsRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const securityDevice_1 = require("./routes/securityDevice");
const express_rate_limit_1 = require("express-rate-limit");
exports.app = (0, express_1.default)();
const registrationLimiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 10 * 1000,
    limit: 5,
    message: 'Too many requests from this IP, please try again later.',
});
exports.app.use(registrationLimiter);
exports.app.set('trust proxy', true);
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(express_1.default.json());
//endpoints
exports.app.use('/api/testing/all-data', deleteRouter_1.deleteRouter);
// app.use('/api', videoRouter)
exports.app.use('/api/blogs', blogsRouter_1.blogsRouter);
exports.app.use('/api/posts', postsRouter_1.postsRouter);
exports.app.use('/api/users', usersRouter_1.usersRouter);
exports.app.use('/api/auth', authRouter_1.authRouter);
exports.app.use('/api/comments', commentsRouter_1.commentRouter);
exports.app.use('/api/security/devices', securityDevice_1.deviceRouter);
