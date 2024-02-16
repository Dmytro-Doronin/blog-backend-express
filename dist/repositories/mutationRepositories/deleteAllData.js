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
exports.deleteAllDataMutation = void 0;
const schemes_1 = require("../../db/schemes");
exports.deleteAllDataMutation = {
    deleteAllDataFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.BlogModel.deleteMany({});
                yield schemes_1.PostModel.deleteMany({});
                yield schemes_1.UserModel.deleteMany({});
                yield schemes_1.CommentModel.deleteMany({});
                yield schemes_1.BlackListModel.deleteMany({});
                yield schemes_1.DeviceModel.deleteMany({});
                yield schemes_1.RateModel.deleteMany({});
                yield schemes_1.LikeModel.deleteMany({});
            }
            catch (e) {
                console.log(e);
                throw new Error('All data was not deleted');
            }
        });
    }
};
