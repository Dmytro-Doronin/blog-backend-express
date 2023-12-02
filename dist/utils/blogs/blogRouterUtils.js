"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouterUtils = void 0;
const db_1 = require("../../db/db");
const { v4: uuidv4 } = require('uuid');
exports.blogRouterUtils = {
    createBlog({ name, description, websiteUrl }) {
        const newBlog = {
            id: uuidv4(),
            name,
            description,
            websiteUrl
        };
        db_1.blogDB.blogs.push(newBlog);
        const addedItem = db_1.blogDB.blogs.find(blog => blog.id === newBlog.id);
        return addedItem;
    },
    getBlogById(id) {
        const result = db_1.blogDB.blogs.find(item => item.id === id);
        return result;
    },
    changeBlogById({ id, name, description, websiteUrl }) {
        const foundBlog = db_1.blogDB.blogs.find(item => item.id === item.id);
        if (!foundBlog) {
            return null;
        }
        const changedUser = Object.assign(Object.assign({}, foundBlog), { name,
            description,
            websiteUrl });
        const indexFoundBlog = db_1.blogDB.blogs.findIndex(item => item.id === foundBlog.id);
        db_1.blogDB.blogs.splice(indexFoundBlog, 1, changedUser);
        return true;
    },
    deleteBlogById(id) {
        const foundBlog = db_1.blogDB.blogs.find(item => item.id === item.id);
        if (!foundBlog) {
            return null;
        }
        const indexFoundBlog = db_1.blogDB.blogs.findIndex(item => item.id === foundBlog.id);
        db_1.blogDB.blogs.splice(indexFoundBlog, 1);
        return true;
    }
};
