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
exports.commentQuery = void 0;
const mapper_1 = require("../../utils/mapper");
const schemes_1 = require("../../db/schemes");
exports.commentQuery = {
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
                const allLikesAndDislikesForCurrentComment = yield schemes_1.LikeModel.find({ commentId: commentId }).lean();
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
