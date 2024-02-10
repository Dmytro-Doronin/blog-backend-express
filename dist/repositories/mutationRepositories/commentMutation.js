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
const mapper_1 = require("../../utils/mapper");
const schemes_1 = require("../../db/schemes");
exports.commentMutation = {
    createCommentForPostInDb(newComments) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.CommentModel.create(newComments);
                const comment = yield schemes_1.CommentModel.findOne({ id: newComments.id }).lean();
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
                yield schemes_1.CommentModel.updateOne({ id: id }, {
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
            yield schemes_1.CommentModel.deleteOne({ id: id });
        });
    }
};
