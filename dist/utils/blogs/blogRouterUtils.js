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
exports.blogRouterUtils = exports.dbBlogCollections = void 0;
const db_1 = require("../../db/db");
const { v4: uuidv4 } = require('uuid');
exports.dbBlogCollections = db_1.client.db('Blogs').collection('blogs');
exports.blogRouterUtils = {
    getAllBlog() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield exports.dbBlogCollections.find({}).toArray();
            }
            catch (e) {
                throw new Error('Does not get all blogs');
            }
        });
    },
    createBlog({ name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                id: uuidv4(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: true
            };
            try {
                const result = yield exports.dbBlogCollections.insertOne(newBlog);
                return yield exports.dbBlogCollections.findOne({ id: newBlog.id });
            }
            catch (e) {
                throw new Error('Blog was not add');
            }
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield exports.dbBlogCollections.findOne({ id: id });
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
    changeBlogById({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield exports.dbBlogCollections.findOne({ id: id });
                if (!addedItem) {
                    return null;
                }
                yield exports.dbBlogCollections.updateOne({ id: addedItem.id }, {
                    $set: { name, description, websiteUrl }
                });
                return true;
            }
            catch (e) {
                throw new Error('Blog was not changed by id');
            }
            // const foundBlog = blogDB.blogs.find(item => item.id === id)
            //
            // if (foundBlog === undefined) {
            //     return null
            // }
            //
            // const changedUser = {
            //     ...foundBlog,
            //     name,
            //     description,
            //     websiteUrl
            // }
            //
            // const indexFoundBlog = blogDB.blogs.findIndex(item => item.id === foundBlog.id)
            //
            // blogDB.blogs.splice(indexFoundBlog, 1, changedUser)
            //
            // return true
        });
    },
    deleteBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const foundBlog = blogDB.blogs.find(item => item.id === id)
            //
            // if (foundBlog === undefined) {
            //     return null
            // }
            //
            //
            //
            // const indexFoundBlog = blogDB.blogs.findIndex(item => item.id === foundBlog.id)
            //
            // blogDB.blogs.splice(indexFoundBlog, 1)
            //
            // return true
            try {
                const res = yield exports.dbBlogCollections.deleteOne({ id: id });
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
