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
exports.postQuery = void 0;
const mapper_1 = require("../../utils/mapper");
const sortUtils_1 = require("../../utils/sortUtils");
const schemes_1 = require("../../db/schemes");
exports.postQuery = {
    getAllPostsFromDb(sortData) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            try {
                const post = yield schemes_1.PostModel
                    .find({})
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .lean();
                const totalCount = yield schemes_1.PostModel.countDocuments({});
                const pagesCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: post.map(mapper_1.postMapper)
                };
            }
            catch (e) {
                throw new Error('Posts was not get');
            }
        });
    },
    getPostByIdFromDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield schemes_1.PostModel.findOne({ id: id });
                if (!result) {
                    return null;
                }
                return (0, mapper_1.postMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
    // async getAllCommentsForPostFromDb (id: string, sortData: QueryCommentsInputModel, userId: string) {
    //
    //     const sortBy = sortData.sortBy ?? 'createdAt'
    //     const sortDirection = sortData.sortDirection ?? 'desc'
    //     const pageNumber = sortData.pageNumber ?? 1
    //     const pageSize = sortData.pageSize ?? 10
    //
    //
    //     try {
    //         const comment = await CommentModel
    //             .find({postId: id})
    //             .sort(filterForSort(sortBy, sortDirection))
    //             .skip((+pageNumber - 1) * +pageSize)
    //             .limit(+pageSize)
    //             .lean()
    //
    //         const totalCount = await CommentModel.countDocuments({postId: id})
    //
    //         const pagesCount = Math.ceil(totalCount / +pageSize)
    //
    //         return {
    //             pagesCount,
    //             page: +pageNumber,
    //             pageSize: +pageSize,
    //             totalCount,
    //             items: comment.map(commentMapper)
    //         }
    //
    //
    //     } catch (e) {
    //         throw new Error('Comments was not get')
    //     }
    //
    //     // try {
    //     //     let comment
    //     //     if (!userId) {
    //     //          comment = await CommentModel
    //     //             .find({postId: id})
    //     //             .sort(filterForSort(sortBy, sortDirection))
    //     //             .skip((+pageNumber - 1) * +pageSize)
    //     //             .limit(+pageSize)
    //     //             .lean()
    //     //     } else {
    //     //          comment = await CommentModel.aggregate([
    //     //             {
    //     //                 $match: {postId: id}
    //     //             },
    //     //             {
    //     //                 $sort: filterForSort(sortBy, sortDirection)
    //     //             },
    //     //             {
    //     //                 $skip: (+pageNumber - 1) * +pageSize
    //     //             },
    //     //             {
    //     //                 $limit: +pageSize
    //     //             },
    //     //             {
    //     //                 $project: {
    //     //                     id: 1,
    //     //                     content: 1,
    //     //                     commentatorInfo: 1,
    //     //                     createdAt: 1,
    //     //                     likesInfo: {
    //     //                         likesCount: 1,
    //     //                         dislikesCount: 1,
    //     //                         myStatus: {
    //     //                             $cond: [
    //     //                                 {
    //     //                                     $in: [userId, '$likesInfo.likedBy']
    //     //                                 },
    //     //                                 'Like',
    //     //                                 {
    //     //                                     $cond: [
    //     //                                         {
    //     //                                             $in: [userId, '$likesInfo.dislikedBy']
    //     //                                         },
    //     //                                         'Dislike',
    //     //                                     ]
    //     //                                 },
    //     //                                 'None'
    //     //                             ]
    //     //                         }
    //     //                     }
    //     //                 }
    //     //             }
    //     //         ])
    //     //     }
    //
    // }
};
