"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = exports.routePath = void 0;
exports.routePath = {
    BLOGS: '/api/blogs',
    BLOGS_WITH_ID: '/api/blogs/:id/posts'
};
exports.setting = {
    JWT_SECRET: process.env.JWT_SECRET || '123'
};
