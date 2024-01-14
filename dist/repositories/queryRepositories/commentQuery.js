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
exports.commentQuery = void 0;
const dbCollections_1 = require("../../db/dbCollections");
const maper_1 = require("../../utils/maper");
exports.commentQuery = {
    getCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield dbCollections_1.dbCommentsCollections.findOne({ id: id });
                if (!result) {
                    return null;
                }
                return (0, maper_1.commentMapper)(result);
            }
            catch (e) {
                throw new Error('Comment was not found');
            }
        });
    }
};