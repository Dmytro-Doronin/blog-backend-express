"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostByIdController = exports.changePostByIdController = exports.getPostByIdController = exports.createNewPostController = exports.getAllPostsController = void 0;
const postsRouterUtils_1 = require("../utils/posts/postsRouterUtils");
const getAllPostsController = (req, res) => {
    const result = postsRouterUtils_1.postsRouterUtils.getAllPosts();
    return res.status(200).send(result);
};
exports.getAllPostsController = getAllPostsController;
const createNewPostController = (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const result = postsRouterUtils_1.postsRouterUtils.createPost({ title, shortDescription, content, blogId });
    return res.status(201).send(result);
};
exports.createNewPostController = createNewPostController;
const getPostByIdController = (req, res) => {
    const result = postsRouterUtils_1.postsRouterUtils.getPostById(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
};
exports.getPostByIdController = getPostByIdController;
const changePostByIdController = (req, res) => {
    const { title, shortDescription, content, blogId } = req.body;
    const id = req.params.id;
    const result = postsRouterUtils_1.postsRouterUtils.changePostById({ id, title, shortDescription, content, blogId });
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
};
exports.changePostByIdController = changePostByIdController;
const deletePostByIdController = (req, res) => {
    const result = postsRouterUtils_1.postsRouterUtils.deletePostById(req.params.id);
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
};
exports.deletePostByIdController = deletePostByIdController;
