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
exports.setLikeStatusForPostsController = exports.getAllCommentsForPostController = exports.createCommentForPostController = exports.deletePostByIdController = exports.changePostByIdController = exports.getPostByIdController = exports.createNewPostController = exports.getAllPostsController = void 0;
const postQuery_1 = require("../repositories/queryRepositories/postQuery");
const postsService_1 = require("../services/posts/postsService");
const commentsService_1 = require("../services/comments/commentsService");
const likeMutation_1 = require("../repositories/mutationRepositories/likeMutation");
const likeService_1 = require("../services/likes/likeService");
const postMutation_1 = require("../repositories/mutationRepositories/postMutation");
const getAllPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const result = yield postsService_1.postsService.getAllPosts(sortData, userId);
    return res.status(200).send(result);
});
exports.getAllPostsController = getAllPostsController;
const createNewPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, shortDescription, content, blogId } = req.body;
    const result = yield postsService_1.postsService.createPostService({ title, shortDescription, content, blogId });
    if (!result) {
        res.sendStatus(400);
        return;
    }
    return res.status(201).send(result);
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
    if (!result) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.deletePostByIdController = deletePostByIdController;
const createCommentForPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { content } = req.body;
    const { id: postId } = req.params;
    const comment = yield commentsService_1.commentsService.createComment(postId, content, req.user.id, req.user.accountData.login);
    if (comment === null) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(comment);
    return;
});
exports.createCommentForPostController = createCommentForPostController;
const getAllCommentsForPostController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    const userId = req.userId;
    const post = yield postQuery_1.postQuery.getPostByIdFromDb(postId);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const comments = yield postsService_1.postsService.getAllCommentsForPostService(postId, sortData, userId);
    return res.status(200).send(comments);
});
exports.getAllCommentsForPostController = getAllCommentsForPostController;
const setLikeStatusForPostsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = "Post";
    const postId = req.params.id;
    const likeStatus = req.body.likeStatus;
    const userId = req.userId;
    const post = yield postMutation_1.postMutation.getPostById(postId);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    const likeOrDislike = yield likeMutation_1.likeMutation.getLike(userId, postId);
    if (!likeOrDislike) {
        yield likeService_1.likeService.createLike(postId, likeStatus, userId, target);
        res.sendStatus(204);
        return;
    }
    if (likeStatus === likeOrDislike.type) {
        res.sendStatus(204);
        return;
    }
    const result = yield likeService_1.likeService.changeLikeStatus(postId, likeStatus, userId, target);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.setLikeStatusForPostsController = setLikeStatusForPostsController;
