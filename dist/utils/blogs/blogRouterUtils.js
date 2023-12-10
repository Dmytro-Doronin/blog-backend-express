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
const mongodb_1 = require("mongodb");
const maper_1 = require("../maper");
const { v4: uuidv4 } = require('uuid');
exports.dbBlogCollections = db_1.client.db('Blogs').collection('blogs');
exports.blogRouterUtils = {
    getAllBlog() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield exports.dbBlogCollections.find({}).toArray();
                return blogs.map(maper_1.blogMapper);
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
                isMembership: false
            };
            try {
                yield exports.dbBlogCollections.insertOne({
                    _id: new mongodb_1.ObjectId(newBlog.id),
                    id: newBlog.id,
                    name: newBlog.name,
                    description: newBlog.description,
                    websiteUrl: newBlog.websiteUrl,
                    createdAt: newBlog.createdAt,
                    isMembership: newBlog.isMembership
                });
                const result = yield exports.dbBlogCollections.findOne({ _id: new mongodb_1.ObjectId(newBlog.id) });
                if (!result) {
                    return null;
                }
                return (0, maper_1.blogMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not add');
            }
        });
    },
    getBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield exports.dbBlogCollections.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (!blog) {
                    return null;
                }
                return (0, maper_1.blogMapper)(blog);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
    changeBlogById({ id, name, description, websiteUrl }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield exports.dbBlogCollections.findOne({ _id: new mongodb_1.ObjectId(id) });
                if (!addedItem) {
                    return null;
                }
                yield exports.dbBlogCollections.updateOne({ _id: new mongodb_1.ObjectId(id) }, {
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
                const res = yield exports.dbBlogCollections.deleteOne({ _id: new mongodb_1.ObjectId(id) });
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
