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
const mapper_1 = require("../../utils/mapper");
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
            };
            const comment = yield commentMutation_1.commentMutation.createCommentForPostInDb(newComments);
            if (!comment) {
                return null;
            }
            return (0, mapper_1.commentMapper)(comment);
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
};
