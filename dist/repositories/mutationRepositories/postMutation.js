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
const mapper_1 = require("../../utils/mapper");
const schemes_1 = require("../../db/schemes");
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
                return (0, mapper_1.postMapper)(result);
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
                if (res.deletedCount === 1) {
                    return true;
                }
                return null;
            }
            catch (e) {
                throw new Error('Blog was nod deleted');
            }
        });
    }
};
