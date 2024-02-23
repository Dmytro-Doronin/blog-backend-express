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
const schemes_1 = require("../../db/schemes");
exports.postQuery = {
    // async getAllPostsFromDb (sortData: QueryPostInputModel, userId: string) {
    //
    //     const sortBy = sortData.sortBy ?? 'createdAt'
    //     const sortDirection = sortData.sortDirection ?? 'desc'
    //     const pageNumber = sortData.pageNumber ?? 1
    //     const pageSize = sortData.pageSize ?? 10
    //
    //     try {
    //         const posts = await PostModel
    //             .find({})
    //             .sort(filterForSort(sortBy, sortDirection))
    //             .skip((+pageNumber - 1) * +pageSize)
    //             .limit(+pageSize)
    //             .lean()
    //
    //         const totalCount = await PostModel.countDocuments({})
    //
    //         const pagesCount = Math.ceil(totalCount / +pageSize)
    //         return {
    //             pagesCount,
    //             page: +pageNumber,
    //             pageSize: +pageSize,
    //             totalCount,
    //             items: this._mapPosts(posts, userId)
    //         }
    //     } catch (e) {
    //         throw new Error('Posts was not get')
    //     }
    // },
    getPostByIdFromDb(postId, userId = '') {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield schemes_1.PostModel.findOne({ id: postId }).lean();
                if (!post) {
                    return null;
                }
                let status;
                if (userId) {
                    const like = yield schemes_1.LikeModel.findOne({ targetId: postId, userId: userId }).lean();
                    status = like === null || like === void 0 ? void 0 : like.type;
                }
                const allLikesAndDislikesForCurrentComment = yield schemes_1.LikeModel.find({ targetId: postId }).lean();
                const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
                const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");
                const likesFromDb = yield schemes_1.LikeModel
                    .find({ type: 'Like', targetId: postId, target: 'Post' })
                    .sort({ ['addedAt']: -1 })
                    .limit(3)
                    .lean();
                const newestLikes = likesFromDb.map(item => {
                    return {
                        addedAt: item.addedAt,
                        userId: item.userId,
                        login: item.login
                    };
                });
                return {
                    id: post.id,
                    title: post.title,
                    shortDescription: post.shortDescription,
                    content: post.content,
                    blogId: post.blogId,
                    blogName: post.blogName,
                    createdAt: post.createdAt,
                    extendedLikesInfo: {
                        likesCount: (_a = likes.length) !== null && _a !== void 0 ? _a : 0,
                        dislikesCount: (_b = dislikes.length) !== null && _b !== void 0 ? _b : 0,
                        myStatus: status !== null && status !== void 0 ? status : "None",
                        newestLikes: newestLikes !== null && newestLikes !== void 0 ? newestLikes : []
                    }
                };
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
    // async _mapPosts (posts: PostDbModelType[], userId: string) {
    //     const mappedItems = await Promise.all(posts.map(async (item) => {
    //         let status: likeStatusType | undefined
    //
    //         if (userId) {
    //             const likeForCurrentComment = await likeMutation.getLike(userId, item.id);
    //             status = likeForCurrentComment?.type
    //         }
    //
    //
    //         const allLikesAndDislikesForCurrentComment = await likeMutation.getAllLikesAndDislikesForComment(item.id);
    //         const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
    //         const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");
    //
    //
    //         const likesFromDb = await LikeModel
    //             .find({type: 'Like'})
    //             .sort({['addedAt']: 1})
    //             .limit(3)
    //             .lean()
    //
    //         const newestLikes = likesFromDb.map(item => {
    //             return {
    //                 addedAt: item.addedAt,
    //                 userId: item.userId,
    //                 login: item.login
    //             }
    //         })
    //
    //         return {
    //             id: item.id,
    //             title: item.title,
    //             shortDescription: item.shortDescription,
    //             content: item.content,
    //             blogId: item.blogId,
    //             blogName: item.blogName,
    //             createdAt: item.createdAt,
    //             extendedLikesInfo: {
    //                 likesCount: likes.length ?? 0,
    //                 dislikesCount: dislikes.length ?? 0,
    //                 myStatus: status ?? "None",
    //                 newestLikes : newestLikes
    //             }
    //         };
    //     }));
    //
    //     return mappedItems
    // }
};
