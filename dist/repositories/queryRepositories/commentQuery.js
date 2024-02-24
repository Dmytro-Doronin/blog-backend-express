"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.CommentQuery = void 0;
const mapper_1 = require("../../utils/mapper");
const schemes_1 = require("../../db/schemes");
const inversify_1 = require("inversify");
let CommentQuery = class CommentQuery {
    getCommentById(commentId, userId = '') {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield schemes_1.CommentModel.findOne({ id: commentId }).lean();
                if (!result) {
                    return null;
                }
                let status;
                if (userId) {
                    const like = yield schemes_1.LikeModel.findOne({ targetId: commentId, userId: userId }).lean();
                    status = like === null || like === void 0 ? void 0 : like.type;
                }
                const allLikesAndDislikesForCurrentComment = yield schemes_1.LikeModel.find({ targetId: commentId }).lean();
                const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
                const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");
                return (0, mapper_1.commentMapper)(result, likes.length, dislikes.length, status);
            }
            catch (e) {
                throw new Error('Comment was not found');
            }
        });
    }
};
exports.CommentQuery = CommentQuery;
exports.CommentQuery = CommentQuery = __decorate([
    (0, inversify_1.injectable)()
], CommentQuery);
