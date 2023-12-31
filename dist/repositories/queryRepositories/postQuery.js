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
const maper_1 = require("../maper");
const dbCollections_1 = require("../dbCollections");
exports.postQuery = {
    getAllPostsFromDb(sortData) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : "createdAt";
            const sortDirection = sortData.sortDirection === 'asc' ? 1 : -1;
            const pageNumber = (_b = sortData.pageNumber) !== null && _b !== void 0 ? _b : 1;
            const pageSize = (_c = sortData.pageSize) !== null && _c !== void 0 ? _c : 10;
            try {
                const post = yield dbCollections_1.dbPostCollections
                    .find({})
                    .sort(sortBy, sortDirection)
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
                    items: post.map(maper_1.postMapper)
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
                return (0, maper_1.postMapper)(result);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
};
