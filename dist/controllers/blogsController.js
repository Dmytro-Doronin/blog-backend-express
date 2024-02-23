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
exports.BlogController = void 0;
const postsService_1 = require("../services/posts/postsService");
class BlogController {
    constructor(blogsService, blogQuery) {
        this.blogsService = blogsService;
        this.blogQuery = blogQuery;
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
            const posts = yield postsService_1.postsService.getAllPosts(sortData, userId, blogId);
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
            const post = yield postsService_1.postsService.createPostService({ title, shortDescription, content, blogId });
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
}
exports.BlogController = BlogController;
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
