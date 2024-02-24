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
exports.CommentsService = void 0;
const postQuery_1 = require("../../repositories/queryRepositories/postQuery");
const commentMutation_1 = require("../../repositories/mutationRepositories/commentMutation");
const mapper_1 = require("../../utils/mapper");
const inversify_1 = require("inversify");
const { v4: uuidv4 } = require('uuid');
const postQuery = new postQuery_1.PostQuery();
let CommentsService = class CommentsService {
    constructor(commentMutation) {
        this.commentMutation = commentMutation;
    }
    createComment(postId, content, userId, userLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield postQuery.getPostByIdFromDb(postId, userId);
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
            const comment = yield this.commentMutation.createCommentForPostInDb(newComments);
            if (!comment) {
                return null;
            }
            return (0, mapper_1.commentMapper)(comment);
        });
    }
    changeComment(id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentMutation.changeCommentByIdInDb(id, content);
        });
    }
    deleteComment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentMutation.deleteCommentById(id);
        });
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(commentMutation_1.CommentMutation)),
    __metadata("design:paramtypes", [commentMutation_1.CommentMutation])
], CommentsService);
