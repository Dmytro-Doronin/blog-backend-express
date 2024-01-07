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
exports.userMutation = void 0;
const dbCollections_1 = require("../../db/dbCollections");
const maper_1 = require("../../utils/maper");
const userQuery_1 = require("../queryRepositories/userQuery");
exports.userMutation = {
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbUsersCollections.insertOne(newUser);
                const findUser = yield userQuery_1.userQuery.findUserById(newUser.id);
                if (!findUser) {
                    return null;
                }
                return (0, maper_1.userMapper)(findUser);
            }
            catch (e) {
                throw new Error('Blog was not created');
            }
        });
    },
    deleteUserByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield dbCollections_1.dbUsersCollections.deleteOne({ id: id });
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
