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
exports.commentMutation = void 0;
const dbCollections_1 = require("../../db/dbCollections");
const mapper_1 = require("../../utils/mapper");
exports.commentMutation = {
    createCommentForPostInDb(newComments) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbCommentsCollections.insertOne(newComments);
                const comment = yield dbCollections_1.dbCommentsCollections.findOne({ id: newComments.id });
                if (!comment) {
                    return null;
                }
                return (0, mapper_1.commentMapper)(comment);
            }
            catch (e) {
                throw new Error('Comment was not created');
            }
        });
    },
    changeCommentByIdInDb(id, newContent) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbCommentsCollections.updateOne({ id: id }, {
                    $set: { content: newContent }
                });
            }
            catch (e) {
                throw new Error('Comment was not changed by id');
            }
        });
    },
    deleteCommentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbCollections_1.dbCommentsCollections.deleteOne({ id: id });
        });
    }
};
