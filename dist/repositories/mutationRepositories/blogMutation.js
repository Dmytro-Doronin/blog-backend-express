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
const maper_1 = require("../../utils/maper");
const dbCollections_1 = require("../../db/dbCollections");
const { v4: uuidv4 } = require('uuid');
exports.blogMutation = {
    createBlogInDb(newBlog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbBlogCollections.insertOne(newBlog);
                const result = yield dbCollections_1.dbBlogCollections.findOne({ id: newBlog.id });
                if (!result) {
                    return null;
                }
                return (0, maper_1.blogMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    },
    createPostToBlogInDb(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbPostCollections.insertOne(post);
                const postFromDb = yield dbCollections_1.dbPostCollections.findOne({ id: post.id });
                if (!postFromDb) {
                    return null;
                }
                return (0, maper_1.postMapper)(postFromDb);
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    },
    changeBlogByIdInDb({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield dbCollections_1.dbBlogCollections.findOne({ id: id });
                if (!addedItem) {
                    return null;
                }
                yield dbCollections_1.dbBlogCollections.updateOne({ id: id }, {
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
                const res = yield dbCollections_1.dbBlogCollections.deleteOne({ id: id });
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
