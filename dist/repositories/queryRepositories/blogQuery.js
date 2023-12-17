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
exports.blogQuery = void 0;
const maper_1 = require("../maper");
const dbCollections_1 = require("../dbCollections");
exports.blogQuery = {
    getAllBlogInDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blogs = yield dbCollections_1.dbBlogCollections.find({}).toArray();
                return blogs.map(maper_1.blogMapper);
            }
            catch (e) {
                throw new Error('Does not get all blogs');
            }
        });
    },
    getBlogByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const blog = yield dbCollections_1.dbBlogCollections.findOne({ id: id });
                if (!blog) {
                    return null;
                }
                return (0, maper_1.blogMapper)(blog);
            }
            catch (e) {
                throw new Error('Blog was not found');
            }
        });
    },
};
