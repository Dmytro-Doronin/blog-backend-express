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
const dbCollections_1 = require("../../db/dbCollections");
const dbCollections_2 = require("../../db/dbCollections");
exports.deleteAllDataMutation = {
    deleteAllDataFromDb() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dbCollections_1.dbBlogCollections.deleteMany({});
                yield dbCollections_2.dbPostCollections.deleteMany({});
                yield dbCollections_1.dbUsersCollections.deleteMany({});
                yield dbCollections_1.dbCommentsCollections.deleteMany({});
                yield dbCollections_1.dbBlacklistCollections.deleteMany({});
                yield dbCollections_1.dbDeviceCollections.deleteMany({});
                yield dbCollections_1.dbRateLimitCollections.deleteMany({});
            }
            catch (e) {
                throw new Error('All data was not deleted');
            }
        });
    }
};
