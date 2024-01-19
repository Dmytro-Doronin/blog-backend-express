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
exports.emailResendingController = exports.registrationConfirmationController = exports.registrationController = exports.authController = void 0;
const usersService_1 = require("../services/users/usersService");
const jwtService_1 = require("../application/jwtService");
const authService_1 = require("../services/auth/authService");
const authController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const user = yield usersService_1.usersService.checkCredentials(loginOrEmail, password);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const token = yield jwtService_1.jwtService.createJWT(user);
    res.status(200).send(token);
    return;
    // const result = await userQuery.findUserByLoginOrEmail()
});
exports.authController = authController;
const registrationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, email, password } = req.body;
    const checkUserEmail = yield authService_1.authService.checkAuthCredentials(email, password);
    const checkUserLogin = yield authService_1.authService.checkAuthCredentials(login, password);
    if (checkUserEmail || checkUserLogin) {
        res.sendStatus(400);
        return;
    }
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
