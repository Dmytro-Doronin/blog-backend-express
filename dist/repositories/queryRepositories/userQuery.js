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
exports.userQuery = void 0;
const dbCollections_1 = require("../../db/dbCollections");
const sortUtils_1 = require("../../utils/sortUtils");
const mapper_1 = require("../../utils/mapper");
exports.userQuery = {
    getAllUsers(sortData) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        return __awaiter(this, void 0, void 0, function* () {
            const sortBy = (_a = sortData.sortBy) !== null && _a !== void 0 ? _a : 'createdAt';
            const sortDirection = (_b = sortData.sortDirection) !== null && _b !== void 0 ? _b : 'desc';
            const pageNumber = (_c = sortData.pageNumber) !== null && _c !== void 0 ? _c : 1;
            const pageSize = (_d = sortData.pageSize) !== null && _d !== void 0 ? _d : 10;
            const searchLoginTerm = (_e = sortData.searchLoginTerm) !== null && _e !== void 0 ? _e : null;
            const searchEmailTerm = (_f = sortData.searchEmailTerm) !== null && _f !== void 0 ? _f : null;
            // let filter: any = {}
            //
            // if (searchEmailTerm) {
            //     filter['email'] = {$regex: searchEmailTerm, $options: 'i'}
            // }
            //
            // if (searchLoginTerm) {
            //     filter['login'] = {$regex: searchLoginTerm, $options: 'i'}
            // }
            let filter = { $or: [] };
            if (searchEmailTerm) {
                (_g = filter['$or']) === null || _g === void 0 ? void 0 : _g.push({ email: { $regex: searchEmailTerm, $options: 'i' } });
            }
            if (searchLoginTerm) {
                (_h = filter['$or']) === null || _h === void 0 ? void 0 : _h.push({ login: { $regex: searchLoginTerm, $options: 'i' } });
            }
            if (((_j = filter['$or']) === null || _j === void 0 ? void 0 : _j.length) === 0) {
                (_k = filter['$or']) === null || _k === void 0 ? void 0 : _k.push({});
            }
            try {
                const users = yield dbCollections_1.dbUsersCollections
                    .find(filter)
                    .sort((0, sortUtils_1.filterForSort)(sortBy, sortDirection))
                    .skip((+pageNumber - 1) * +pageSize)
                    .limit(+pageSize)
                    .toArray();
                const totalCount = yield dbCollections_1.dbUsersCollections.countDocuments(filter);
                const pagesCount = Math.ceil(totalCount / +pageSize);
                return {
                    pagesCount,
                    page: +pageNumber,
                    pageSize: +pageSize,
                    totalCount,
                    items: users.map(mapper_1.userMapper)
                };
            }
            catch (e) {
                throw new Error('Does not get all users');
            }
        });
    },
    findUserByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield dbCollections_1.dbUsersCollections.findOne({ $or: [{ 'accountData.email': loginOrEmail }, { 'accountData.login': loginOrEmail }] });
            return user;
        });
    },
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return dbCollections_1.dbUsersCollections.findOne({ id: id });
        });
    }
};
