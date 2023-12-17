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
exports.postsRouterUtils = exports.dbPostCollections = void 0;
const db_1 = require("../../db/db");
const maper_1 = require("../maper");
const { v4: uuidv4 } = require('uuid');
exports.dbPostCollections = db_1.client.db('Blogs').collection('posts');
exports.postsRouterUtils = {
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield exports.dbPostCollections.find({}).toArray();
                return post.map(maper_1.postMapper);
            }
            catch (e) {
                throw new Error('Posts was not get');
            }
        });
    },
    createPost({ title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = {
                    id: uuidv4(),
                    title,
                    shortDescription,
                    content,
                    blogId,
                    createdAt: (new Date().toISOString()),
                    blogName: ''
                };
                yield exports.dbPostCollections.insertOne(newPost);
                const result = yield exports.dbPostCollections.findOne({ id: newPost.id });
                if (!result) {
                    return null;
                }
                return (0, maper_1.postMapper)(result);
            }
            catch (e) {
                throw new Error('Post was not add');
            }
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield exports.dbPostCollections.findOne({ id: id });
                if (!result) {
                    return null;
                }
                return (0, maper_1.postMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
    changePostById({ id, title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield exports.dbPostCollections.findOne({ id: id });
                if (!addedItem) {
                    return null;
                }
                const result = yield exports.dbPostCollections.updateOne({ id: id }, {
                    $set: { title, shortDescription, content, blogId }
                });
                return !!result.matchedCount;
            }
            catch (e) {
                throw new Error('Blog was not changed by id');
            }
        });
    },
    deletePostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield exports.dbPostCollections.deleteOne({ id: id });
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
