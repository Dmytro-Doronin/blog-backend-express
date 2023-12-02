"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const videoRouter_1 = require("./routes/videoRouter");
const blogsRouter_1 = require("./routes/blogsRouter");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
//endpoints
exports.app.use('/api', videoRouter_1.videoRouter);
exports.app.use('/api/blogs', blogsRouter_1.blogsRouter);
// app.use('/posts', videoRouter)
