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
exports.BlogController = void 0;
const blogQuery_1 = require("../repositories/queryRepositories/blogQuery");
const blogsService_1 = require("../services/blogs/blogsService");
const postsService_1 = require("../services/posts/postsService");
const inversify_1 = require("inversify");
let BlogController = class BlogController {
    constructor(blogsService, blogQuery, postsService) {
        this.blogsService = blogsService;
        this.blogQuery = blogQuery;
        this.postsService = postsService;
    }
    getAllBlogsController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // const sortData = req.query
            const sortData = {
                searchNameTerm: req.query.searchNameTerm,
                sortBy: req.query.sortBy,
                sortDirection: req.query.sortDirection,
                pageNumber: req.query.pageNumber,
                pageSize: req.query.pageSize
            };
            const result = yield this.blogQuery.getAllBlogInDb(sortData);
            return res.status(200).send(result);
        });
    }
    getAllPostInBlogController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogId = req.params.id;
            const userId = req.userId;
            // const sortData = req.query
            const sortData = {
                sortBy: req.query.sortBy,
                sortDirection: req.query.sortDirection,
                pageNumber: req.query.pageNumber,
                pageSize: req.query.pageSize
            };
            const blog = yield this.blogQuery.getBlogByIdInDb(blogId);
            if (!blog) {
                res.sendStatus(404);
                return;
            }
            // const posts = await this.blogQuery.getAllPostsInBlogFromDb(blogId, sortData)
            const posts = yield this.postsService.getAllPosts(sortData, userId, blogId);
            return res.status(200).send(posts);
        });
    }
    getBlogsByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.blogQuery.getBlogByIdInDb(req.params.id);
            if (!result) {
                return res.sendStatus(404);
            }
            return res.status(200).send(result);
        });
    }
    createNewBlogController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, websiteUrl } = req.body;
            const result = yield this.blogsService.createBlogService({ name, description, websiteUrl });
            return res.status(201).send(result);
        });
    }
    createPostToBlogController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogId = req.params.id;
            const { title, shortDescription, content } = req.body;
            // const post = await this.blogsService.createPostToBlogService(blogId, {title, shortDescription, content})
            const post = yield this.postsService.createPostService({ title, shortDescription, content, blogId });
            if (!post) {
                res.sendStatus(404);
                return;
            }
            res.status(201).send(post);
        });
    }
    changeBlogsByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, websiteUrl } = req.body;
            const id = req.params.id;
            const result = yield this.blogsService.changeBlogByIdService({ id, name, description, websiteUrl });
            if (result === null) {
                return res.sendStatus(404);
            }
            return res.sendStatus(204);
        });
    }
    deleteBlogsByIdController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.blogsService.deleteBlogByIdService(req.params.id);
            if (!result) {
                return res.sendStatus(404);
            }
            return res.sendStatus(204);
        });
    }
};
exports.BlogController = BlogController;
exports.BlogController = BlogController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(blogsService_1.BlogsService)),
    __param(1, (0, inversify_1.inject)(blogQuery_1.BlogQuery)),
    __param(2, (0, inversify_1.inject)(postsService_1.PostsService)),
    __metadata("design:paramtypes", [blogsService_1.BlogsService,
        blogQuery_1.BlogQuery,
        postsService_1.PostsService])
], BlogController);
// export const getAllBlogsController = async (req: RequestWithQuery<QueryBlogInputModel>, res: ResponseWithData<BlogOutputModelType>) => {
//         // const sortData = req.query
//     const sortData = {
//         searchNameTerm: req.query.searchNameTerm,
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize
//     }
//         const result = await blogQuery.getAllBlogInDb(sortData)
//         return res.status(200).send(result)
// }
// export const getAllPostInBlogController = async (req: RequestWithParamsAndQuery<ParamsType, QueryBlogToPostsInputModel>, res: Response) => {
//     const blogId = req.params.id
//     // const sortData = req.query
//     const sortData = {
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize
//     }
//     const blog = await blogQuery.getBlogByIdInDb(blogId)
//
//     if (!blog) {
//         res.sendStatus(404)
//         return
//     }
//
//     const posts = await blogQuery.getAllPostsInBlogFromDb(blogId, sortData)
//
//     return res.status(200).send(posts)
//
// }
// export const getBlogsByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
//
//     const result = await blogQuery.getBlogByIdInDb(req.params.id)
//
//     if (!result) {
//         return res.sendStatus(404)
//     }
//
//     return res.status(200).send(result)
//
// }
// export const createNewBlogController = async (req: RequestWithBody<BlogInputModelType> , res: Response) => {
//
//     const {name,description, websiteUrl} = req.body
//
//     const result = await blogsService.createBlogService({name, description, websiteUrl})
//
//     return res.status(201).send(result)
// }
//
// export const createPostToBlogController = async (req: RequestWithParamsAndBody<ParamsType, CreatePostToBlogType>, res: Response) => {
//     const id = req.params
//     const {title, shortDescription, content} = req.body
//
//     const post = await blogsService.createPostToBlogService(id, {title, shortDescription, content})
//
//     if (!post) {
//         res.sendStatus(404)
//         return
//     }
//
//     res.status(201).send(post)
// }
// export const changeBlogsByIdController = async (req: RequestWithParamsAndBody<ParamsType, BlogInputModelType>, res: Response) => {
//
//     const {name, description, websiteUrl} = req.body
//     const id = req.params.id
//
//     const result = await blogsService.changeBlogByIdService({id, name, description, websiteUrl})
//
//     if (result === null) {
//         return res.sendStatus(404)
//     }
//
//     return res.sendStatus(204)
// }
//
// export const deleteBlogsByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
//
//     const result = await blogsService.deleteBlogByIdService(req.params.id)
//
//     if (!result) {
//         return res.sendStatus(404)
//     }
//
//     return res.sendStatus(204)
//
//
// }
