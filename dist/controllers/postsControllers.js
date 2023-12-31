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
exports.deletePostByIdController = exports.changePostByIdController = exports.getPostByIdController = exports.createNewPostController = exports.getAllPostsController = void 0;
const postQuery_1 = require("../repositories/queryRepositories/postQuery");
const postsService_1 = require("../services/posts/postsService");
const getAllPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = req.query;
    try {
        const result = yield postQuery_1.postQuery.getAllPostsFromDb(sortData);
        return res.status(200).send(result);
    }
    catch (e) {
        throw new Error('Posts does not get');
    }
});
exports.getAllPostsController = getAllPostsController;
const createNewPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, shortDescription, content, blogId } = req.body;
        const result = yield postsService_1.postsService.createPostService({ title, shortDescription, content, blogId });
        return res.status(201).send(result);
    }
    catch (e) {
        throw new Error('Blogs does not create');
    }
});
exports.createNewPostController = createNewPostController;
const getPostByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield postQuery_1.postQuery.getPostByIdFromDb(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
});
exports.getPostByIdController = getPostByIdController;
const changePostByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const id = req.params.id;
    const result = yield postsService_1.postsService.changePostByIdService({ id, title, shortDescription, content, blogId });
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.changePostByIdController = changePostByIdController;
const deletePostByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield postsService_1.postsService.deletePostByIdService(req.params.id);
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.deletePostByIdController = deletePostByIdController;
