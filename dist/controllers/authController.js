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
exports.logoutController = exports.refreshTokenController = exports.meController = exports.emailResendingController = exports.registrationConfirmationController = exports.registrationController = exports.authController = void 0;
const usersService_1 = require("../services/users/usersService");
const jwtService_1 = require("../application/jwtService");
const authService_1 = require("../services/auth/authService");
const userQuery_1 = require("../repositories/queryRepositories/userQuery");
const maper_1 = require("../utils/maper");
const authController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const user = yield usersService_1.usersService.checkCredentials(loginOrEmail, password);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const accessToken = yield jwtService_1.jwtService.createJWTAccessToken(user);
    const refreshToken = yield jwtService_1.jwtService.createJWTRefreshToken(user);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).send(accessToken);
    return;
    // const result = await userQuery.findUserByLoginOrEmail()
});
exports.authController = authController;
const registrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, email, password } = req.body;
    // const checkUserEmail = await authService.checkAuthCredentials(email, password)
    // const checkUserLogin = await authService.checkAuthCredentials(login, password)
    //
    //
    // if (checkUserEmail || checkUserLogin) {
    //     res.sendStatus(400)
    //     return
    // }
    yield authService_1.authService.createUser({ login, email, password });
    res.sendStatus(204);
    return;
});
exports.registrationController = registrationController;
const registrationConfirmationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.body;
    const confirm = yield authService_1.authService.confirmEmail(code);
    if (!confirm) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.registrationConfirmationController = registrationConfirmationController;
const emailResendingController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield authService_1.authService.resendEmail(email);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.emailResendingController = emailResendingController;
const meController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromRequest = req.cookies.refreshToken;
    const userId = req.user.id;
    const login = req.user.accountData.login;
    const email = req.user.accountData.email;
    if (!refreshTokenFromRequest) {
        res.sendStatus(401);
        return;
    }
    // const decodedToken = await jwtService.verifyToken(refreshTokenFromRequest)
    //
    // if (!decodedToken) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromRequest)
    //
    // if (tokenInBlackList) {
    //     res.sendStatus(401)
    //     return
    // }
    res.status(200).send({ email, login, userId });
    return;
});
exports.meController = meController;
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromRequest = req.cookies.refreshToken;
    // const user = req.user
    const userId = req.userId;
    const user = yield userQuery_1.userQuery.findUserById(userId);
    // if (!refreshTokenFromRequest) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const decodedToken = await jwtService.verifyToken(refreshTokenFromRequest)
    //
    // if (!decodedToken) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const tokenInBlackList = await jwtService.isTokenBlacklisted(refreshTokenFromRequest)
    //
    // if (tokenInBlackList) {
    //     res.sendStatus(401)
    //     return
    // }
    yield jwtService_1.jwtService.putTokenToTheBlackList(refreshTokenFromRequest);
    const accessToken = yield jwtService_1.jwtService.createJWTAccessToken((0, maper_1.userMapper)(user));
    const refreshToken = yield jwtService_1.jwtService.createJWTRefreshToken((0, maper_1.userMapper)(user));
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).send(accessToken);
    return;
});
exports.refreshTokenController = refreshTokenController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromRequest = req.cookies.refreshToken;
    // if (!refreshTokenFromRequest) {
    //     res.sendStatus(401)
    //     return
    // }
    //
    // const decodedToken = await jwtService.verifyToken(refreshTokenFromRequest)
    //
    // if (!decodedToken) {
    //     res.sendStatus(401)
    //     return
    // }
    yield jwtService_1.jwtService.putTokenToTheBlackList(refreshTokenFromRequest);
    res.sendStatus(204);
    return;
});
exports.logoutController = logoutController;
