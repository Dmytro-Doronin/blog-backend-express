"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthController = void 0;
const jwtService_1 = require("../application/jwtService");
const authService_1 = require("../services/auth/authService");
const userQuery_1 = require("../repositories/queryRepositories/userQuery");
const mapper_1 = require("../utils/mapper");
const securityDevices_1 = require("../services/securityDevices/securityDevices");
const inversify_1 = require("inversify");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    authController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const user = yield this.authService.checkAuthCredentials(loginOrEmail, password);
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
    }
    registrationController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, email, password } = req.body;
            yield this.authService.createUser({ login, email, password });
            res.sendStatus(204);
            return;
        });
    }
    registrationConfirmationController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { code } = req.body;
            const confirm = yield this.authService.confirmEmail(code);
            if (!confirm) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
            return;
        });
    }
    newPasswordController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { recoveryCode, newPassword } = req.body;
            // const confirm = await authService.confirmEmail(code)
            const result = yield this.authService.newPassword(recoveryCode, newPassword);
            if (!result) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
            return;
        });
    }
    emailResendingController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const result = yield this.authService.resendEmail(email);
            if (!result) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
            return;
        });
    }
    passwordRecoveryController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            const result = yield this.authService.recoveryPassword(email);
            if (!result) {
                res.sendStatus(400);
                return;
            }
            res.sendStatus(204);
            return;
        });
    }
    meController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.user.id;
            const login = req.user.accountData.login;
            const email = req.user.accountData.email;
            res.status(200).send({ email, login, userId });
            return;
        });
    }
    refreshTokenController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.userId;
            const deviceId = req.deviceId;
            const user = yield userQuery_1.userQuery.findUserById(userId);
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
    }
    logoutController(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenFromRequest = req.cookies.refreshToken;
            const deviceId = req.deviceId;
            yield securityDevices_1.securityDevicesService.deleteDevice(deviceId);
            // await jwtService.putTokenToTheBlackList(refreshTokenFromRequest)
            res.sendStatus(204);
            return;
        });
    }
};
exports.AuthController = AuthController;
exports.AuthController = AuthController = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(authService_1.AuthService)),
    __metadata("design:paramtypes", [authService_1.AuthService])
], AuthController);
