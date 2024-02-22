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
exports.likeService = void 0;
const likeMutation_1 = require("../../repositories/mutationRepositories/likeMutation");
const userMutation_1 = require("../../repositories/mutationRepositories/userMutation");
const { v4: uuidv4 } = require('uuid');
exports.likeService = {
    createLike(commentId, likeStatus, userId, target) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userMutation_1.userMutation.getUserById(userId);
            if (!user) {
                return null;
            }
            const liseData = {
                id: uuidv4(),
                userId,
                login: user.accountData.login,
                targetId: commentId,
                target,
                addedAt: (new Date().toISOString()),
                type: likeStatus
            };
            return yield likeMutation_1.likeMutation.createLike(liseData);
        });
    },
    changeLikeStatus(commentId, likeStatus, userId, target) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield likeMutation_1.likeMutation.updateLike(userId, commentId, likeStatus, target);
        });
    }
};
