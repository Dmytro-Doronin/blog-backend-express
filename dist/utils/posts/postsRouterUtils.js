"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouterUtils = void 0;
const db_1 = require("../../db/db");
const { v4: uuidv4 } = require('uuid');
exports.postsRouterUtils = {
    getAllPosts() {
        const res = db_1.blogDB.posts;
        return res;
    },
    createPost({ title, shortDescription, content, blogId }) {
        const newPost = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: ''
        };
        db_1.blogDB.posts.push(newPost);
        const addedItem = db_1.blogDB.posts.find(post => post.id === newPost.id);
        return addedItem;
    },
    getPostById(id) {
        const result = db_1.blogDB.posts.find(item => item.id === id);
        return result;
    },
    changePostById({ id, title, shortDescription, content, blogId }) {
        const foundPost = db_1.blogDB.posts.find(item => item.id === id);
        if (foundPost === undefined) {
            return null;
        }
        const changedUser = Object.assign(Object.assign({}, foundPost), { title,
            shortDescription,
            content,
            blogId });
        const indexFoundBlog = db_1.blogDB.posts.findIndex(item => item.id === foundPost.id);
        db_1.blogDB.posts.splice(indexFoundBlog, 1, changedUser);
        return true;
    },
    deletePostById(id) {
        const foundPost = db_1.blogDB.posts.find(item => item.id === id);
        if (foundPost === undefined) {
            return null;
        }
        const indexFoundPost = db_1.blogDB.posts.findIndex(item => item.id === foundPost.id);
        db_1.blogDB.posts.splice(indexFoundPost, 1);
        return true;
    }
};
