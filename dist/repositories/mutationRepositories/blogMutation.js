"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.BlogMutation = void 0;
const schemes_1 = require("../../db/schemes");
const { v4: uuidv4 } = require('uuid');
const inversify_1 = require("inversify");
let BlogMutation = class BlogMutation {
    createBlogInDb(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.BlogModel.create(newBlog);
                const result = yield schemes_1.BlogModel.findOne({ id: newBlog.id }).lean();
                if (!result) {
                    return null;
                }
                return result;
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    }
    createPostToBlogInDb(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.PostModel.create(post);
                const postFromDb = yield schemes_1.PostModel.findOne({ id: post.id }).lean();
                if (!postFromDb) {
                    return null;
                }
                return postFromDb;
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    }
    changeBlogByIdInDb({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield schemes_1.BlogModel.findOne({ id: id }).lean();
                if (!addedItem) {
                    return null;
                }
                const result = yield schemes_1.BlogModel.updateOne({ id: id }, {
                    $set: { name, description, websiteUrl }
                });
                return result.modifiedCount === 1;
            }
            catch (e) {
                throw new Error('Blog was not changed by id');
            }
        });
    }
    deleteBlogByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield schemes_1.BlogModel.deleteOne({ id: id });
                return res.deletedCount === 1;
            }
            catch (e) {
                throw new Error('Blog was nod deleted');
            }
        });
    }
    getBlogByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield schemes_1.BlogModel.findOne({ id: id }).lean();
                if (!blog) {
                    return null;
                }
                return blog;
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    }
};
exports.BlogMutation = BlogMutation;
exports.BlogMutation = BlogMutation = __decorate([
    (0, inversify_1.injectable)()
], BlogMutation);
