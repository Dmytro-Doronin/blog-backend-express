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
    getCommentById(id, userId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result;
                if (!userId) {
                    result = yield schemes_1.CommentModel.findOne({ id: id }).lean();
                }
                else {
                    result = yield schemes_1.CommentModel.aggregate([
                        {
                            $match: { postId: id }
                        },
                        {
                            $project: {
                                id: 1,
                                content: 1,
                                commentatorInfo: 1,
                                createdAt: 1,
                                likesInfo: {
                                    likesCount: 1,
                                    dislikesCount: 1,
                                    myStatus: {
                                        $cond: [
                                            {
                                                $in: [userId, '$likesInfo.likedBy']
                                            },
                                            'Like',
                                            {
                                                $cond: [
                                                    {
                                                        $in: [userId, '$likesInfo.dislikedBy']
                                                    },
                                                    'Dislike',
                                                ]
                                            },
                                            'None'
                                        ]
                                    }
                                }
                            }
                        }
                    ]);
                }
                if (!result || (Array.isArray(result) && result.length === 0)) {
                    return null;
                }
                if (Array.isArray(result)) {
                    return (0, mapper_1.commentMapper)(result[0]);
                }
                return (0, mapper_1.commentMapper)(result);
            }
            catch (e) {
                throw new Error('Comment was not found');
            }
        });
    }
};
