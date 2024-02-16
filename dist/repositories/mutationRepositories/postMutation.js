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
exports.postMutation = void 0;
const schemes_1 = require("../../db/schemes");
const sortUtils_1 = require("../../utils/sortUtils");
//export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')
exports.postMutation = {
    createPostInDb(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.PostModel.create(newPost);
                const result = yield schemes_1.PostModel.findOne({ id: newPost.id }).lean();
                if (!result) {
                    return null;
                }
                return result;
            }
            catch (e) {
                throw new Error('Post was not add');
            }
        });
    },
    changePostByIdInDb({ id, title, shortDescription, content, blogId }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addedItem = yield schemes_1.PostModel.findOne({ id: id }).lean();
                if (!addedItem) {
                    return null;
                }
                const result = yield schemes_1.PostModel.updateOne({ id: id }, {
                    $set: { title, shortDescription, content, blogId }
                });
                return !!result.matchedCount;
            }
            catch (e) {
                throw new Error('Blog was not changed by id');
            }
        });
    },
    deletePostByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield schemes_1.PostModel.deleteOne({ id: id });
                return res.deletedCount === 1;
            }
            catch (e) {
                throw new Error('Blog was nod deleted');
            }
        });
    },
    getAllCommentForPostFromDb(postId, sortData) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            try {
                const comment = yield schemes_1.CommentModel
                    .find({ postId: postId })
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .lean();
                const totalCount = yield schemes_1.CommentModel.countDocuments({ postId: postId });
                const pagesCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: comment
                };
            }
            catch (e) {
                throw new Error('Comments was not get');
            }
        });
    }
};
