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
exports.blogsService = void 0;
const blogMutation_1 = require("../../repositories/mutationRepositories/blogMutation");
const { v4: uuidv4 } = require('uuid');
exports.blogsService = {
    createBlogService({ name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: uuidv4(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            };
            return yield blogMutation_1.blogMutation.createBlogInDb(newBlog);
        });
    },
    changeBlogByIdService({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogMutation_1.blogMutation.changeBlogByIdInDb({ id, name, description, websiteUrl });
        });
    },
    deleteBlogByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blogMutation_1.blogMutation.deleteBlogByIdInDb(id);
        });
    }
};
