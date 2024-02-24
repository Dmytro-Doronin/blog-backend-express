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
exports.PostsService = void 0;
const postMutation_1 = require("../../repositories/mutationRepositories/postMutation");
const blogQuery_1 = require("../../repositories/queryRepositories/blogQuery");
const likeMutation_1 = require("../../repositories/mutationRepositories/likeMutation");
const mapper_1 = require("../../utils/mapper");
const schemes_1 = require("../../db/schemes");
const { v4: uuidv4 } = require('uuid');
const inversify_1 = require("inversify");
let PostsService = class PostsService {
    constructor(postMutation, blogQuery) {
        this.postMutation = postMutation;
        this.blogQuery = blogQuery;
    }
    getAllPosts(sortData, userId, blogId = null) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield this.postMutation.getAllPosts(sortData, blogId);
            return this._mapPosts(posts, userId);
        });
    }
    createPostService({ title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield this.blogQuery.getBlogByIdInDb(blogId);
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
            const post = yield this.postMutation.createPostInDb(newPost);
            if (!post) {
                return null;
            }
            return (0, mapper_1.postMapper)(post);
        });
    }
    changePostByIdService({ id, title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postMutation.changePostByIdInDb({ id, title, shortDescription, content, blogId });
        });
    }
    deletePostByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postMutation.deletePostByIdInDb(id);
        });
    }
    getAllCommentsForPostService(postId, sortData, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comments = yield this.postMutation.getAllCommentForPostFromDb(postId, sortData);
            return this._mapCommentService(comments, userId);
        });
    }
    _mapCommentService(comments, userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
    _mapPosts(posts, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const mappedItems = yield Promise.all(posts.items.map((item) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                let status;
                if (userId) {
                    const likeForCurrentComment = yield likeMutation_1.likeMutation.getLike(userId, item.id);
                    status = likeForCurrentComment === null || likeForCurrentComment === void 0 ? void 0 : likeForCurrentComment.type;
                }
                const allLikesAndDislikesForCurrentComment = yield likeMutation_1.likeMutation.getAllLikesAndDislikesForComment(item.id);
                const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
                const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");
                const likesFromDb = yield schemes_1.LikeModel
                    .find({ type: 'Like', targetId: item.id, })
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
                    id: item.id,
                    title: item.title,
                    shortDescription: item.shortDescription,
                    content: item.content,
                    blogId: item.blogId,
                    blogName: item.blogName,
                    createdAt: item.createdAt,
                    extendedLikesInfo: {
                        likesCount: (_a = likes.length) !== null && _a !== void 0 ? _a : 0,
                        dislikesCount: (_b = dislikes.length) !== null && _b !== void 0 ? _b : 0,
                        myStatus: status !== null && status !== void 0 ? status : "None",
                        newestLikes: newestLikes
                    }
                };
            })));
            return {
                pagesCount: posts.pagesCount,
                page: posts.page,
                pageSize: posts.pageSize,
                totalCount: posts.totalCount,
                items: mappedItems
            };
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(postMutation_1.PostMutation)),
    __param(1, (0, inversify_1.inject)(blogQuery_1.BlogQuery)),
    __metadata("design:paramtypes", [postMutation_1.PostMutation,
        blogQuery_1.BlogQuery])
], PostsService);
