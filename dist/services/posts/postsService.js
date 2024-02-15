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
exports.postsService = void 0;
const postMutation_1 = require("../../repositories/mutationRepositories/postMutation");
const blogQuery_1 = require("../../repositories/queryRepositories/blogQuery");
const likeMutation_1 = require("../../repositories/mutationRepositories/likeMutation");
const { v4: uuidv4 } = require('uuid');
exports.postsService = {
    createPostService({ title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blogQuery_1.blogQuery.getBlogByIdInDb(blogId);
            if (!blog) {
                return null;
            }
            const newPost = {
                id: uuidv4(),
                title,
                shortDescription,
                content,
                blogId,
                createdAt: (new Date().toISOString()),
                blogName: blog.name
            };
            return yield postMutation_1.postMutation.createPostInDb(newPost);
        });
    },
    changePostByIdService({ id, title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postMutation_1.postMutation.changePostByIdInDb({ id, title, shortDescription, content, blogId });
        });
    },
    deletePostByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield postMutation_1.postMutation.deletePostByIdInDb(id);
        });
    },
    getAllCommentsForPostService(postId, sortData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield postMutation_1.postMutation.getAllCommentForPostFromDb(postId, sortData);
            return this._mapService(comments, userId);
        });
    },
    _mapService(comments, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // return {
            //     pagesCount: comments.pagesCount,
            //     page: comments.page,
            //     pageSize: comments.pageSize,
            //     totalCount: comments.totalCount,
            //     items: comments.items.map( async (item) => {
            //         const likeForCurrentComment = await likeMutation.getLike(userId, item.id)
            //         const allLikesAndDislikesForCurrentComment = await likeMutation.getAllLikesAndDislikesForComment(item.id)
            //         const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like")
            //         const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike")
            //
            //         return {
            //             id: item.id,
            //             content: item.content,
            //             commentatorInfo: item.commentatorInfo,
            //             createdAt: item.createdAt,
            //             likesInfo: {
            //                 likesCount: likes.length ?? 0,
            //                 dislikesCount: dislikes.length ?? 0,
            //                 myStatus: likeForCurrentComment?.type ?? "None"
            //             }
            //         }
            //     })
            // }
            const mappedItems = yield Promise.all(comments.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                let status;
                if (userId) {
                    const likeForCurrentComment = yield likeMutation_1.likeMutation.getLike(userId, item.id);
                    status = likeForCurrentComment === null || likeForCurrentComment === void 0 ? void 0 : likeForCurrentComment.type;
                }
                const allLikesAndDislikesForCurrentComment = yield likeMutation_1.likeMutation.getAllLikesAndDislikesForComment(item.id);
                const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
                const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");
                return {
                    id: item.id,
                    content: item.content,
                    commentatorInfo: item.commentatorInfo,
                    createdAt: item.createdAt,
                    likesInfo: {
                        likesCount: (_a = likes.length) !== null && _a !== void 0 ? _a : 0,
                        dislikesCount: (_b = dislikes.length) !== null && _b !== void 0 ? _b : 0,
                        myStatus: status !== null && status !== void 0 ? status : "None"
                    }
                };
            })));
            return {
                pagesCount: comments.pagesCount,
                page: comments.page,
                pageSize: comments.pageSize,
                totalCount: comments.totalCount,
                items: mappedItems
            };
        });
    }
};
