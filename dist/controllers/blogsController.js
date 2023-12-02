"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlogsByIdController = exports.changeBlogsByIdController = exports.getBlogsByIdController = exports.createNewBlogController = exports.getAllBlogsController = void 0;
const db_1 = require("../db/db");
const blogRouterUtils_1 = require("../utils/blogs/blogRouterUtils");
// export const deleteAllDataFromBlogsAndPostsController = (req: Request, res: Response) => {
//     return res.status(200).send(blogDB.blogs)
// }
const getAllBlogsController = (req, res) => {
    return res.status(200).send(db_1.blogDB.blogs);
};
exports.getAllBlogsController = getAllBlogsController;
const createNewBlogController = (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const result = blogRouterUtils_1.blogRouterUtils.createBlog({ name, description, websiteUrl });
    return res.status(201).send(result);
};
exports.createNewBlogController = createNewBlogController;
const getBlogsByIdController = (req, res) => {
    const result = blogRouterUtils_1.blogRouterUtils.getBlogById(req.params.id);
    if (!result) {
        return res.sendStatus(404);
    }
    return res.status(200).send(result);
};
exports.getBlogsByIdController = getBlogsByIdController;
const changeBlogsByIdController = (req, res) => {
    const { name, description, websiteUrl } = req.body;
    const id = req.params.id;
    const rusult = blogRouterUtils_1.blogRouterUtils.changeBlogById({ id, name, description, websiteUrl });
    if (rusult === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
};
exports.changeBlogsByIdController = changeBlogsByIdController;
const deleteBlogsByIdController = (req, res) => {
    const result = blogRouterUtils_1.blogRouterUtils.deleteBlogById(req.params.id);
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
};
exports.deleteBlogsByIdController = deleteBlogsByIdController;
