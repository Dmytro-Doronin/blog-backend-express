"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.CommentsController = void 0;
const commentQuery_1 = require("../repositories/queryRepositories/commentQuery");
const commentsService_1 = require("../services/comments/commentsService");
const likeService_1 = require("../services/likes/likeService");
const likeMutation_1 = require("../repositories/mutationRepositories/likeMutation");
const commentMutation_1 = require("../repositories/mutationRepositories/commentMutation");
const inversify_1 = require("inversify");
let CommentsController = class CommentsController {
    constructor(commentQuery, commentsService, commentMutation) {
        this.commentQuery = commentQuery;
        this.commentsService = commentsService;
        this.commentMutation = commentMutation;
    }
    getCommentByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentId = req.params.id;
            const userId = req.userId;
            const comment = yield this.commentQuery.getCommentById(commentId, userId);
            if (!comment) {
                res.sendStatus(404);
                return;
            }
            res.status(200).send(comment);
        });
    }
    changeCommentByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const content = req.body.content;
            const userId = req.userId;
            const comment = yield this.commentQuery.getCommentById(id, userId);
            if (!comment) {
                res.sendStatus(404);
                return;
            }
            const currenUserId = req.user.id;
            if (currenUserId !== comment.commentatorInfo.userId) {
                res.sendStatus(403);
                return;
            }
            yield this.commentsService.changeComment(comment.id, content);
            res.sendStatus(204);
            return;
        });
    }
    deleteCommentByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const comment = yield this.commentQuery.getCommentById(id);
            if (!comment) {
                res.sendStatus(404);
                return;
            }
            const currenUserId = req.user.id;
            if (currenUserId !== comment.commentatorInfo.userId) {
                res.sendStatus(403);
                return;
            }
            yield this.commentsService.deleteComment(comment.id);
            res.sendStatus(204);
            return;
        });
    }
    setLikeStatusForCommentsController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = "Comment";
            const commentId = req.params.id;
            const likeStatus = req.body.likeStatus;
            const userId = req.userId;
            const comment = yield this.commentMutation.getCommentById(commentId);
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
    }
};
exports.CommentsController = CommentsController;
exports.CommentsController = CommentsController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(commentQuery_1.CommentQuery)),
    __param(1, (0, inversify_1.inject)(commentsService_1.CommentsService)),
    __param(2, (0, inversify_1.inject)(commentMutation_1.CommentMutation)),
    __metadata("design:paramtypes", [commentQuery_1.CommentQuery,
        commentsService_1.CommentsService,
        commentMutation_1.CommentMutation])
], CommentsController);
