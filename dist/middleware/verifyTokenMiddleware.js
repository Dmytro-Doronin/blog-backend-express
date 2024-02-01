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
const deviceQuery_1 = require("../repositories/queryRepositories/deviceQuery");
const verifyTokenMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromCookie = req.cookies.refreshToken;
    if (!refreshTokenFromCookie) {
        res.sendStatus(401);
        return;
    }
    const decodedToken = yield jwtService_1.jwtService.verifyToken(refreshTokenFromCookie);
    if (!decodedToken) {
        res.sendStatus(401);
        return;
    }
    console.log(decodedToken.lastActiveDate);
    const result = yield deviceQuery_1.deviceQuery.getDeviceByActiveDataAndUserId(decodedToken.lastActiveDate, decodedToken.deviceId);
    if (result === false) {
        res.sendStatus(401);
        return;
    }
    // const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromCookie)
    //
    // if (tokenInBlackList) {
    //     res.sendStatus(401)
    //     return
    // }
    req.tokenData.userId = decodedToken.userId;
    req.tokenData.deviceId = decodedToken.deviceId;
    return next();
});
exports.verifyTokenMiddleware = verifyTokenMiddleware;
