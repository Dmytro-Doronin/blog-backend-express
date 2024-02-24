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
exports.PostController = void 0;
const postQuery_1 = require("../repositories/queryRepositories/postQuery");
const postsService_1 = require("../services/posts/postsService");
const commentsService_1 = require("../services/comments/commentsService");
const likeMutation_1 = require("../repositories/mutationRepositories/likeMutation");
const likeService_1 = require("../services/likes/likeService");
const postMutation_1 = require("../repositories/mutationRepositories/postMutation");
const inversify_1 = require("inversify");
let PostController = class PostController {
    constructor(postQuery, postsService, commentsService, postMutation) {
        this.postQuery = postQuery;
        this.postsService = postsService;
        this.commentsService = commentsService;
        this.postMutation = postMutation;
    }
    getAllPostsController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const sortData = {
                sortBy: req.query.sortBy,
                sortDirection: req.query.sortDirection,
                pageNumber: req.query.pageNumber,
                pageSize: req.query.pageSize
            };
            const result = yield this.postsService.getAllPosts(sortData, userId);
            return res.status(200).send(result);
        });
    }
    createNewPostController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content, blogId } = req.body;
            const result = yield this.postsService.createPostService({ title, shortDescription, content, blogId });
            if (!result) {
                res.sendStatus(400);
                return;
            }
            return res.status(201).send(result);
        });
    }
    getPostByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const postId = req.params.id;
            const result = yield this.postQuery.getPostByIdFromDb(postId, userId);
            if (!result) {
                return res.sendStatus(404);
            }
            return res.status(200).send(result);
        });
    }
    changePostByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, shortDescription, content, blogId } = req.body;
            const id = req.params.id;
            const result = yield this.postsService.changePostByIdService({ id, title, shortDescription, content, blogId });
            if (result === null) {
                return res.sendStatus(404);
            }
            return res.sendStatus(204);
        });
    }
    deletePostByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.postsService.deletePostByIdService(req.params.id);
            if (!result) {
                return res.sendStatus(404);
            }
            return res.sendStatus(204);
        });
    }
    createCommentForPostController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content } = req.body;
            const { id: postId } = req.params;
            const comment = yield this.commentsService.createComment(postId, content, req.user.id, req.user.accountData.login);
            if (comment === null) {
                res.sendStatus(404);
                return;
            }
            res.status(201).send(comment);
            return;
        });
    }
    getAllCommentsForPostController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postId = req.params.id;
            const userId = req.userId;
            const post = yield this.postQuery.getPostByIdFromDb(postId, userId);
            if (!post) {
                res.sendStatus(404);
                return;
            }
            const sortData = {
                sortBy: req.query.sortBy,
                sortDirection: req.query.sortDirection,
                pageNumber: req.query.pageNumber,
                pageSize: req.query.pageSize
            };
            const comments = yield this.postsService.getAllCommentsForPostService(postId, sortData, userId);
            return res.status(200).send(comments);
        });
    }
    setLikeStatusForPostsController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = "Post";
            const postId = req.params.id;
            const likeStatus = req.body.likeStatus;
            const userId = req.userId;
            const post = yield this.postMutation.getPostById(postId);
            if (!post) {
                res.sendStatus(404);
                return;
            }
            const likeOrDislike = yield likeMutation_1.likeMutation.getLike(userId, postId);
            if (!likeOrDislike) {
                yield likeService_1.likeService.createLike(postId, likeStatus, userId, target);
                res.sendStatus(204);
                return;
            }
            if (likeStatus === likeOrDislike.type) {
                res.sendStatus(204);
                return;
            }
            const result = yield likeService_1.likeService.changeLikeStatus(postId, likeStatus, userId, target);
            if (!result) {
                res.sendStatus(404);
                return;
            }
            res.sendStatus(204);
            return;
        });
    }
};
exports.PostController = PostController;
exports.PostController = PostController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(postQuery_1.PostQuery)),
    __param(1, (0, inversify_1.inject)(postsService_1.PostsService)),
    __param(2, (0, inversify_1.inject)(commentsService_1.CommentsService)),
    __param(3, (0, inversify_1.inject)(postMutation_1.PostMutation)),
    __metadata("design:paramtypes", [postQuery_1.PostQuery,
        postsService_1.PostsService,
        commentsService_1.CommentsService,
        postMutation_1.PostMutation])
], PostController);
// export const getAllPostsController = async (req: RequestWithQuery<QueryPostInputModel>, res: ResponseWithData<PostsOutputModelType>) => {
//
//     const userId = req.userId
//
//     const sortData = {
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize
//     }
//
//     const result: PostsOutputModelType = await postsService.getAllPosts(sortData, userId)
//     return res.status(200).send(result)
//
// }
//
// export const createNewPostController = async (req: RequestWithBody<PostInputModelType> , res: Response) => {
//
//     const {title, shortDescription, content, blogId} = req.body
//
//     const result = await postsService.createPostService({title, shortDescription, content, blogId})
//
//     if (!result) {
//         res.sendStatus(400)
//         return
//     }
//
//     return res.status(201).send(result)
//
// }
//
// export const getPostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
//
//     const userId = req.userId
//     const postId = req.params.id
//     const result = await postQuery.getPostByIdFromDb(postId, userId)
//
//     if (!result) {
//         return res.sendStatus(404)
//     }
//
//     return res.status(200).send(result)
//
// }
//
// export const changePostByIdController = async (req: RequestWithParamsAndBody<ParamsType, PostInputModelType>, res: Response) => {
//
//     const {title, shortDescription, content, blogId} = req.body
//     const id = req.params.id
//
//     const result = await postsService.changePostByIdService({id, title, shortDescription, content, blogId})
//
//     if (result === null) {
//         return res.sendStatus(404)
//     }
//
//     return res.sendStatus(204)
// }
//
// export const deletePostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
//
//     const result = await postsService.deletePostByIdService(req.params.id)
//
//     if (!result) {
//         return res.sendStatus(404)
//     }
//
//     return res.sendStatus(204)
// }
//
// export const createCommentForPostController = async (req: RequestWithParamsAndBody<ParamsType, CommentInputModelType>, res: Response) => {
//
//     const {content} = req.body
//     const {id: postId} = req.params
//
//     const comment = await commentsService.createComment(postId, content, req.user!.id, req.user!.accountData.login)
//
//     if (comment === null) {
//         res.sendStatus(404)
//         return
//     }
//     res.status(201).send(comment)
//     return
//
// }
//
// export const getAllCommentsForPostController = async (req: RequestWithParamsAndQuery<ParamsType, QueryCommentsInputModel>, res: ResponseWithData<CommentsOutputModelType> ) =>{
//     const postId = req.params.id
//     const userId = req.userId
//     const post = await postQuery.getPostByIdFromDb(postId, userId)
//
//     if (!post) {
//         res.sendStatus(404)
//         return
//     }
//
//
//     const sortData: QueryCommentsInputModel = {
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize
//     }
//
//     const comments = await postsService.getAllCommentsForPostService(postId, sortData, userId)
//
//     return res.status(200).send(comments)
// }
//
// export const setLikeStatusForPostsController = async (req: RequestWithParamsAndBody<ParamsType, LikeStatusType> , res: Response) => {
//     const target = "Post"
//     const postId = req.params.id
//     const likeStatus = req.body.likeStatus
//     const userId = req.userId
//
//     const post = await postMutation.getPostById(postId)
//
//     if (!post) {
//         res.sendStatus(404)
//         return
//     }
//
//     const likeOrDislike = await likeMutation.getLike(userId, postId)
//
//     if (!likeOrDislike) {
//         await likeService.createLike(postId, likeStatus, userId, target)
//         res.sendStatus(204)
//         return
//     }
//
//     if (likeStatus === likeOrDislike.type) {
//         res.sendStatus(204)
//         return
//     }
//
//     const result = await likeService.changeLikeStatus(postId, likeStatus, userId, target)
//
//     if (!result) {
//         res.sendStatus(404)
//         return
//     }
//
//     res.sendStatus(204)
//     return
// }
