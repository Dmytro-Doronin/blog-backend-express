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
exports.blackListMutation = void 0;
const schemes_1 = require("../../db/schemes");
exports.blackListMutation = {
    putTokenInBlackList(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.BlackListModel.create({ token: token });
                const tokenInBlacklist = yield schemes_1.BlackListModel.findOne({ token: token }).lean();
                if (!tokenInBlacklist) {
                    return null;
                }
                return tokenInBlacklist;
            }
            catch (e) {
                throw new Error('Token was not get');
            }
        });
    }
};
