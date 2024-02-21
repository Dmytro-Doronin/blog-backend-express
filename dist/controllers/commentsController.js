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
exports.setLikeStatusForCommentsController = exports.deleteCommentByIdController = exports.changeCommentByIdController = exports.getCommentByIdController = void 0;
const commentQuery_1 = require("../repositories/queryRepositories/commentQuery");
const commentsService_1 = require("../services/comments/commentsService");
const likeService_1 = require("../services/likes/likeService");
const likeMutation_1 = require("../repositories/mutationRepositories/likeMutation");
const commentMutation_1 = require("../repositories/mutationRepositories/commentMutation");
const getCommentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.id;
    const userId = req.userId;
    const comment = yield commentQuery_1.commentQuery.getCommentById(commentId, userId);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(comment);
});
exports.getCommentByIdController = getCommentByIdController;
const changeCommentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const content = req.body.content;
    const userId = req.userId;
    const comment = yield commentQuery_1.commentQuery.getCommentById(id, userId);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    const currenUserId = req.user.id;
    if (currenUserId !== comment.commentatorInfo.userId) {
        res.sendStatus(403);
        return;
    }
    yield commentsService_1.commentsService.changeComment(comment.id, content);
    res.sendStatus(204);
    return;
});
exports.changeCommentByIdController = changeCommentByIdController;
const deleteCommentByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const comment = yield commentQuery_1.commentQuery.getCommentById(id);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    const currenUserId = req.user.id;
    if (currenUserId !== comment.commentatorInfo.userId) {
        res.sendStatus(403);
        return;
    }
    yield commentsService_1.commentsService.deleteComment(comment.id);
    res.sendStatus(204);
    return;
});
exports.deleteCommentByIdController = deleteCommentByIdController;
const setLikeStatusForCommentsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const target = "Comment";
    const commentId = req.params.id;
    const likeStatus = req.body.likeStatus;
    const userId = req.userId;
    const comment = yield commentMutation_1.commentMutation.getCommentById(commentId);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    const likeOrDislike = yield likeMutation_1.likeMutation.getLike(userId, commentId);
    if (!likeOrDislike) {
        yield likeService_1.likeService.createLike(commentId, likeStatus, userId, target);
        res.sendStatus(204);
        return;
    }
    if (likeStatus === likeOrDislike.type) {
        res.sendStatus(204);
        return;
    }
    const result = yield likeService_1.likeService.changeLikeStatus(commentId, likeStatus, userId, target);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.setLikeStatusForCommentsController = setLikeStatusForCommentsController;
