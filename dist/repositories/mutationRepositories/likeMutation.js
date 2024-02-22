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
exports.likeMutation = void 0;
const schemes_1 = require("../../db/schemes");
exports.likeMutation = {
    getLike(userId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemes_1.LikeModel.findOne({ userId: userId, targetId: commentId }).lean();
            }
            catch (e) {
                throw new Error('Can not get like or dislike');
            }
        });
    },
    getAllLikesAndDislikesForComment(commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield schemes_1.LikeModel.find({ targetId: commentId }).lean();
            }
            catch (e) {
                throw new Error('Can not get likes or dislikes for comment');
            }
        });
    },
    createLike(likeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.LikeModel.create(likeData);
                const result = yield schemes_1.LikeModel.findOne({ id: likeData.id }).lean();
                if (!result) {
                    return null;
                }
                return result;
            }
            catch (e) {
                throw new Error('Can not get like or dislike');
            }
        });
    },
    updateLike(userId, commentId, likeStatus, target) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield schemes_1.LikeModel.updateOne({ userId, targetId: commentId, target }, {
                    $set: { type: likeStatus, addedAt: (new Date().toISOString()) }
                });
                return result.modifiedCount === 1;
            }
            catch (e) {
                throw new Error('Can not get like ir dislike');
            }
        });
    }
};
