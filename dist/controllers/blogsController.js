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
exports.deleteBlogsByIdController = exports.changeBlogsByIdController = exports.getBlogsByIdController = exports.createNewBlogController = exports.getAllBlogsController = void 0;
const blogRouterUtils_1 = require("../utils/blogs/blogRouterUtils");
// export const deleteAllDataFromBlogsAndPostsController = (req: Request, res: Response) => {
//     return res.status(200).send(blogDB.blogs)
// }
const getAllBlogsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogRouterUtils_1.blogRouterUtils.getAllBlog();
    return res.status(200).send(result);
});
exports.getAllBlogsController = getAllBlogsController;
const createNewBlogController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const result = yield blogRouterUtils_1.blogRouterUtils.createBlog({ name, description, websiteUrl });
    return res.status(201).send(result);
});
exports.createNewBlogController = createNewBlogController;
const getBlogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogRouterUtils_1.blogRouterUtils.getBlogById(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
});
exports.getBlogsByIdController = getBlogsByIdController;
const changeBlogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, websiteUrl } = req.body;
    const id = req.params.id;
    const result = yield blogRouterUtils_1.blogRouterUtils.changeBlogById({ id, name, description, websiteUrl });
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.changeBlogsByIdController = changeBlogsByIdController;
const deleteBlogsByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blogRouterUtils_1.blogRouterUtils.deleteBlogById(req.params.id);
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.deleteBlogsByIdController = deleteBlogsByIdController;
