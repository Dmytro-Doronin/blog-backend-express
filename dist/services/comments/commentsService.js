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
exports.commentsService = void 0;
const postQuery_1 = require("../../repositories/queryRepositories/postQuery");
const commentMutation_1 = require("../../repositories/mutationRepositories/commentMutation");
const { v4: uuidv4 } = require('uuid');
exports.commentsService = {
    createComment(postId, content, userId, userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postQuery_1.postQuery.getPostByIdFromDb(postId);
            if (!post) {
                return null;
            }
            const newComments = {
                id: uuidv4(),
                postId,
                content,
                commentatorInfo: {
                    userId,
                    userLogin
                },
                createdAt: (new Date().toISOString()),
                likesInfo: {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: "None",
                    likedBy: [],
                    dislikedBy: []
                },
            };
            return commentMutation_1.commentMutation.createCommentForPostInDb(newComments);
        });
    },
    changeComment(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentMutation_1.commentMutation.changeCommentByIdInDb(id, content);
        });
    },
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentMutation_1.commentMutation.deleteCommentById(id);
        });
    },
    changeLikeStatus(commentId, likeStatus, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield commentMutation_1.commentMutation.changeLikeStatus(commentId, likeStatus, userId);
        });
    }
};
