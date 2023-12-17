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
    getAllPostsFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield dbCollections_1.dbPostCollections.find({}).toArray();
                return post.map(maper_1.postMapper);
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
