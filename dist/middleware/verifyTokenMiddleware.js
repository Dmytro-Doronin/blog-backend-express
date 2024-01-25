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
exports.verifyTokenMiddleware = void 0;
const jwtService_1 = require("../application/jwtService");
const verifyTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromCookie = req.cookies;
    if (!refreshTokenFromCookie) {
        res.sendStatus(401);
        return;
    }
    const decodedToken = yield jwtService_1.jwtService.verifyToken(refreshTokenFromCookie);
    if (!decodedToken) {
        res.sendStatus(401);
        return;
    }
    const tokenInBlackList = yield jwtService_1.jwtService.isTokenBlacklisted(refreshTokenFromCookie);
    if (tokenInBlackList) {
        res.sendStatus(401);
        return;
    }
    req.userId = decodedToken.userId;
    return next();
});
exports.verifyTokenMiddleware = verifyTokenMiddleware;
