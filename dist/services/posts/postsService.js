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
exports.postsService = void 0;
const postMutation_1 = require("../../repositories/mutationRepositories/postMutation");
const blogQuery_1 = require("../../repositories/queryRepositories/blogQuery");
const { v4: uuidv4 } = require('uuid');
exports.postsService = {
    createPostService({ title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogQuery_1.blogQuery.getBlogByIdInDb(blogId);
            if (!blog) {
                return null;
            }
            const newPost = {
                id: uuidv4(),
                title,
                shortDescription,
                content,
                blogId,
                createdAt: (new Date().toISOString()),
                blogName: blog.name
            };
            return yield postMutation_1.postMutation.createPostInDb(newPost);
        });
    },
    changePostByIdService({ id, title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postMutation_1.postMutation.changePostByIdInDb({ id, title, shortDescription, content, blogId });
        });
    },
    deletePostByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postMutation_1.postMutation.deletePostByIdInDb(id);
        });
    }
};
