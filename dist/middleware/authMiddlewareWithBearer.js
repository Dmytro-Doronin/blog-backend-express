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
exports.customAuthMiddlewareWithBearer = exports.authMiddlewareWithBearer = void 0;
const jwtService_1 = require("../application/jwtService");
const userQuery_1 = require("../repositories/queryRepositories/userQuery");
const login = 'admin';
const password = 'qwerty';
const authMiddlewareWithBearer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.sendStatus(401);
        return;
    }
    if (req.headers.authorization.split(' ')[0] !== 'Bearer') {
        res.sendStatus(401);
        return;
    }
    const token = req.headers.authorization.split(' ')[1];
    const userId = yield jwtService_1.jwtService.getUserIdByToken(token);
    if (!userId) {
        res.sendStatus(401);
        return;
    }
    req.user = yield userQuery_1.userQuery.findUserById(userId);
    req.userId = userId;
    next();
});
exports.authMiddlewareWithBearer = authMiddlewareWithBearer;
const customAuthMiddlewareWithBearer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        const token = req.headers.authorization.split(' ')[1];
        const userId = yield jwtService_1.jwtService.getUserIdByToken(token);
        if (!userId) {
            req.userId = '';
        }
        req.userId = userId;
    }
    next();
});
exports.customAuthMiddlewareWithBearer = customAuthMiddlewareWithBearer;
