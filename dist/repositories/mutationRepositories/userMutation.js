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
const schemes_1 = require("../../db/schemes");
exports.userMutation = {
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.UserModel.create(newUser);
                const findUser = yield schemes_1.UserModel.findOne({ id: newUser.id }).lean();
                if (!findUser) {
                    return null;
                }
                return findUser;
            }
            catch (e) {
                console.log(e);
                throw new Error('User was not created');
            }
        });
    },
    deleteUserByIdInDb(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield schemes_1.UserModel.deleteOne({ id: id });
                if (res.deletedCount === 1) {
                    return true;
                }
                return null;
            }
            catch (e) {
                throw new Error('User was not deleted');
            }
        });
    }
};
