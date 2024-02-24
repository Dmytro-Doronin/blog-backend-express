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
exports.PostQuery = void 0;
const schemes_1 = require("../../db/schemes");
const inversify_1 = require("inversify");
let PostQuery = class PostQuery {
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
    }
};
exports.PostQuery = PostQuery;
exports.PostQuery = PostQuery = __decorate([
    (0, inversify_1.injectable)()
], PostQuery);
