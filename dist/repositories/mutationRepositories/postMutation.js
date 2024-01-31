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
const dbCollections_1 = require("../../db/dbCollections");
//export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')
exports.postMutation = {
    createPostInDb(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbPostCollections.insertOne(newPost);
                const result = yield dbCollections_1.dbPostCollections.findOne({ id: newPost.id });
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
                const addedItem = yield dbCollections_1.dbPostCollections.findOne({ id: id });
                if (!addedItem) {
                    return null;
                }
                const result = yield dbCollections_1.dbPostCollections.updateOne({ id: id }, {
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
                const res = yield dbCollections_1.dbPostCollections.deleteOne({ id: id });
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
