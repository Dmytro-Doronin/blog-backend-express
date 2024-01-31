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
exports.postQuery = void 0;
const mapper_1 = require("../../utils/mapper");
const dbCollections_1 = require("../../db/dbCollections");
const sortUtils_1 = require("../../utils/sortUtils");
exports.postQuery = {
    getAllPostsFromDb(sortData) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            try {
                const post = yield dbCollections_1.dbPostCollections
                    .find({})
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .toArray();
                const totalCount = yield dbCollections_1.dbPostCollections.countDocuments({});
                const pagesCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: post.map(mapper_1.postMapper)
                };
            }
            catch (e) {
                throw new Error('Posts was not get');
            }
        });
    },
    getPostByIdFromDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield dbCollections_1.dbPostCollections.findOne({ id: id });
                if (!result) {
                    return null;
                }
                return (0, mapper_1.postMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
    getAllCommentsForPostFromDb(id, sortData) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            try {
                const comment = yield dbCollections_1.dbCommentsCollections
                    .find({ postId: id })
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .toArray();
                const totalCount = yield dbCollections_1.dbCommentsCollections.countDocuments({ postId: id });
                const pagesCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: comment.map(mapper_1.commentMapper)
                };
            }
            catch (e) {
                throw new Error('Comments was not get');
            }
        });
    }
};
