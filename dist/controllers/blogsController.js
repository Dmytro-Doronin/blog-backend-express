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
exports.deleteBlogsByIdController = exports.changeBlogsByIdController = exports.getBlogsByIdController = exports.createPostToBlogController = exports.createNewBlogController = exports.getAllPostInBlogController = exports.getAllBlogsController = void 0;
const blogQuery_1 = require("../repositories/queryRepositories/blogQuery");
const blogsService_1 = require("../services/blogs/blogsService");
// export const deleteAllDataFromBlogsAndPostsController = (req: Request, res: Response) => {
//     return res.status(200).send(blogDB.blogs)
// }
const getAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const sortData = req.query
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const result = yield blogQuery_1.blogQuery.getAllBlogInDb(sortData);
    return res.status(200).send(result);
});
exports.getAllBlogsController = getAllBlogsController;
const getAllPostInBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    // const sortData = req.query
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    };
    const blog = yield blogQuery_1.blogQuery.getBlogByIdInDb(blogId);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    const posts = yield blogQuery_1.blogQuery.getAllPostsInBlogFromDb(blogId, sortData);
    return res.status(200).send(posts);
});
exports.getAllPostInBlogController = getAllPostInBlogController;
const createNewBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const result = yield blogsService_1.blogsService.createBlogService({ name, description, websiteUrl });
    return res.status(201).send(result);
});
exports.createNewBlogController = createNewBlogController;
const createPostToBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params;
    const { title, shortDescription, content } = req.body;
    const post = yield blogsService_1.blogsService.createPostToBlogService(id, { title, shortDescription, content });
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(post);
});
exports.createPostToBlogController = createPostToBlogController;
const getBlogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogQuery_1.blogQuery.getBlogByIdInDb(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
});
exports.getBlogsByIdController = getBlogsByIdController;
const changeBlogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const id = req.params.id;
    const result = yield blogsService_1.blogsService.changeBlogByIdService({ id, name, description, websiteUrl });
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.changeBlogsByIdController = changeBlogsByIdController;
const deleteBlogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogsService_1.blogsService.deleteBlogByIdService(req.params.id);
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.deleteBlogsByIdController = deleteBlogsByIdController;
