"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogWebsiteUrl = exports.blogDescription = exports.blogName = void 0;
const express_validator_1 = require("express-validator");
exports.blogName = (0, express_validator_1.body)('name').trim().isLength({ min: 1, max: 15 });
exports.blogDescription = (0, express_validator_1.body)('description').trim().isLength({ max: 500 });
exports.blogWebsiteUrl = (0, express_validator_1.body)('websiteUrl')
    .trim()
    .isLength({ max: 100 })
    .custom(WebsiteUrl => {
    const pattern = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/;
    if (!pattern.test(WebsiteUrl)) {
        return { message: 'invalid WebsiteUrl', field: 'websiteUrl' };
    }
    return true;
});
