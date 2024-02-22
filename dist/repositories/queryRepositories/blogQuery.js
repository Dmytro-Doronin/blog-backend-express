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
exports.BlogQuery = void 0;
const mapper_1 = require("../../utils/mapper");
const sortUtils_1 = require("../../utils/sortUtils");
const schemes_1 = require("../../db/schemes");
class BlogQuery {
    getAllBlogInDb(sortData) {
        var _a, _b, _c, _d, _e;
        return __awaiter(this, void 0, void 0, function* () {
            const searchNameTerm = (_a = sortData.searchNameTerm) !== null && _a !== void 0 ? _a : null;
            const sortBy = (_b = sortData.sortBy) !== null && _b !== void 0 ? _b : 'createdAt';
            const sortDirection = (_c = sortData.sortDirection) !== null && _c !== void 0 ? _c : 'desc';
            const pageNumber = (_d = sortData.pageNumber) !== null && _d !== void 0 ? _d : 1;
            const pageSize = (_e = sortData.pageSize) !== null && _e !== void 0 ? _e : 10;
            let filter = {};
            if (searchNameTerm) {
                filter = {
                    name: { $regex: searchNameTerm, $options: 'i' }
                };
            }
            try {
                const blogs = yield schemes_1.BlogModel
                    .find(filter)
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .lean();
                const totalCount = yield schemes_1.BlogModel.countDocuments(filter);
                const pagesCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: blogs.map(mapper_1.blogMapper)
                };
            }
            catch (e) {
                throw new Error('Does not get all blogs');
            }
        });
    }
    getAllPostsInBlogFromDb(blogId, sortData) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            try {
                const posts = yield schemes_1.PostModel
                    .find({ blogId: blogId })
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .lean();
                const totalCount = yield schemes_1.PostModel.countDocuments({ blogId: blogId });
                const pagesCount = Math.ceil(totalCount / +pageSize);
                // {
                //     id:	post.id,
                //         title: post.title,
                //     shortDescription: post.shortDescription,
                //     content: post.content,
                //     blogId: post.blogId,
                //     blogName: post.blogName,
                //     createdAt: post.createdAt,
                //     extendedLikesInfo: {
                //     likesCount: 0,
                //         dislikesCount: 0,
                //         myStatus: "None",
                //         newestLikes : []
                // }
                // }
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: posts.map(mapper_1.postMapper)
                };
            }
            catch (e) {
                throw new Error('Posts was not get');
            }
        });
    }
    getBlogByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield schemes_1.BlogModel.findOne({ id: id }).lean();
                if (!blog) {
                    return null;
                }
                return (0, mapper_1.blogMapper)(blog);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    }
}
exports.BlogQuery = BlogQuery;
