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
exports.logoutController = exports.refreshTokenController = exports.meController = exports.passwordRecoveryController = exports.emailResendingController = exports.newPasswordController = exports.registrationConfirmationController = exports.registrationController = exports.authController = void 0;
const usersService_1 = require("../services/users/usersService");
const jwtService_1 = require("../application/jwtService");
const authService_1 = require("../services/auth/authService");
const userQuery_1 = require("../repositories/queryRepositories/userQuery");
const mapper_1 = require("../utils/mapper");
const securityDevices_1 = require("../services/securityDevices/securityDevices");
const authController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const ip = req.ip;
    const title = req.headers['User-Agent'];
    let title2;
    if (typeof title !== "string" || typeof title !== undefined) {
        title2 = title === null || title === void 0 ? void 0 : title[0];
    }
    else {
        title2 = title;
    }
    const user = yield usersService_1.usersService.checkCredentials(loginOrEmail, password);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const accessToken = yield jwtService_1.jwtService.createJWTAccessToken(user);
    const refreshToken = yield jwtService_1.jwtService.createJWTRefreshToken(user);
    yield securityDevices_1.securityDevicesService.createDevice(refreshToken, ip, title2);
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).send(accessToken);
    return;
    // const result = await userQuery.findUserByLoginOrEmail()
});
exports.authController = authController;
const registrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, email, password } = req.body;
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
const newPasswordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recoveryCode, newPassword } = req.body;
    // const confirm = await authService.confirmEmail(code)
    const result = yield authService_1.authService.newPassword(recoveryCode, newPassword);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.newPasswordController = newPasswordController;
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
const passwordRecoveryController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const result = yield authService_1.authService.recoveryPassword(email);
    if (!result) {
        res.sendStatus(400);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.passwordRecoveryController = passwordRecoveryController;
const meController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const login = req.user.accountData.login;
    const email = req.user.accountData.email;
    res.status(200).send({ email, login, userId });
    return;
});
exports.meController = meController;
const refreshTokenController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromRequest = req.cookies.refreshToken;
    // const user = req.user
    const userId = req.userId;
    const deviceId = req.deviceId;
    const user = yield userQuery_1.userQuery.findUserById(userId);
    // await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)
    const accessToken = yield jwtService_1.jwtService.createJWTAccessToken((0, mapper_1.userMapper)(user));
    const refreshToken = yield jwtService_1.jwtService.createJWTRefreshToken((0, mapper_1.userMapper)(user), deviceId);
    const result = yield securityDevices_1.securityDevicesService.changeDevicesData(refreshToken);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).send(accessToken);
    return;
});
exports.refreshTokenController = refreshTokenController;
const logoutController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const refreshTokenFromRequest = req.cookies.refreshToken;
    const deviceId = req.deviceId;
    yield securityDevices_1.securityDevicesService.deleteDevice(deviceId);
    // await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)
    res.sendStatus(204);
    return;
});
exports.logoutController = logoutController;
