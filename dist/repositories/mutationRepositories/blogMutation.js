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
exports.blogMutation = void 0;
const mapper_1 = require("../../utils/mapper");
const schemes_1 = require("../../db/schemes");
const { v4: uuidv4 } = require('uuid');
exports.blogMutation = {
    createBlogInDb(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.BlogModel.create(newBlog);
                const result = yield schemes_1.BlogModel.findOne({ id: newBlog.id }).lean();
                if (!result) {
                    return null;
                }
                return (0, mapper_1.blogMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    },
    createPostToBlogInDb(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.PostModel.create(post);
                const postFromDb = yield schemes_1.PostModel.findOne({ id: post.id }).lean();
                if (!postFromDb) {
                    return null;
                }
                return (0, mapper_1.postMapper)(postFromDb);
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    },
    changeBlogByIdInDb({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield schemes_1.BlogModel.findOne({ id: id }).lean();
                if (!addedItem) {
                    return null;
                }
                yield schemes_1.BlogModel.updateOne({ id: id }, {
                    $set: { name, description, websiteUrl }
                });
                return true;
            }
            catch (e) {
                throw new Error('Blog was not changed by id');
            }
        });
    },
    deleteBlogByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield schemes_1.BlogModel.deleteOne({ id: id });
                if (res.deletedCount === 1) {
                    return true;
                }
                return null;
            }
            catch (e) {
                throw new Error('Blog was nod deleted');
            }
        });
    }
};
