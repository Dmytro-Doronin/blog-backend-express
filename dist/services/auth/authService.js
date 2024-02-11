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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const date_fns_1 = require("date-fns");
const userMutation_1 = require("../../repositories/mutationRepositories/userMutation");
const userQuery_1 = require("../../repositories/queryRepositories/userQuery");
const mailManager_1 = require("../../manager/mail/mailManager");
const authQuery_1 = require("../../repositories/queryRepositories/authQuery");
const authMutation_1 = require("../../repositories/mutationRepositories/authMutation");
const { v4: uuidv4 } = require('uuid');
exports.authService = {
    createUser({ email, password, login }) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(password, passwordSalt);
            const newUser = {
                id: uuidv4(),
                accountData: {
                    login: login,
                    email,
                    passwordHash,
                    passwordSalt,
                    createdAt: new Date().toISOString()
                },
                emailConfirmation: {
                    confirmationCode: uuidv4(),
                    expirationDate: (0, date_fns_1.add)(new Date, { minutes: 3 }),
                    isConfirmed: false
                },
                passwordRecovery: {
                    passwordRecoveryCode: uuidv4(),
                    expirationDate: (0, date_fns_1.add)(new Date, { minutes: 3 }),
                }
            };
            const createdUser = yield userMutation_1.userMutation.createUser(newUser);
            if (!createdUser) {
                return null;
            }
            yield mailManager_1.mailManager.sendConfirmationMail(createdUser.accountData.login, createdUser.accountData.email, createdUser.emailConfirmation.confirmationCode);
            return createdUser;
        });
    },
    checkAuthCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userQuery_1.userQuery.findUserByLoginOrEmail(loginOrEmail);
            if (!user)
                return false;
            const passwordHash = yield this._generateHash(password, user.accountData.passwordSalt);
            if (user.accountData.passwordHash === passwordHash) {
                return user;
            }
            else {
                return false;
            }
        });
    },
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield authQuery_1.authQuery.getUserByConfirmationCode(code);
            if (!user) {
                return null;
            }
            if (user.emailConfirmation.confirmationCode === code && user.emailConfirmation.expirationDate > new Date()) {
                return yield authMutation_1.authMutation.updateConfirmation(user.id);
            }
            return false;
        });
    },
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userQuery_1.userQuery.findUserByLoginOrEmail(email);
            if (!user) {
                return false;
            }
            if (user.emailConfirmation.isConfirmed) {
                return false;
            }
            const newCode = {
                code: uuidv4(),
                date: (0, date_fns_1.add)(new Date, { minutes: 3 })
            };
            const updateConfirmation = yield authMutation_1.authMutation.updateConfirmationCode(user.id, newCode.code, newCode.date);
            if (!updateConfirmation) {
                return false;
            }
            return yield mailManager_1.mailManager.sendConfirmationMail(user.accountData.login, user.accountData.email, newCode.code);
        });
    },
    recoveryPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userQuery_1.userQuery.findUserByLoginOrEmail(email);
            if (!user) {
                return true;
            }
            const data = {
                code: uuidv4(),
                date: (0, date_fns_1.add)(new Date, { minutes: 3 })
            };
            const updateRecoveryCode = yield authMutation_1.authMutation.updatePasswordRecoveryCode(user.id, data.code, data.date);
            if (!updateRecoveryCode) {
                return false;
            }
            return yield mailManager_1.mailManager.sendRecoveryPasswordMail(user.accountData.login, user.accountData.email, data.code);
        });
    },
    newPassword(recoveryCode, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordSalt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield this._generateHash(newPassword, passwordSalt);
            return yield authMutation_1.authMutation.updatePassword(passwordSalt, passwordHash, recoveryCode);
        });
    },
    _generateHash(password, salt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.hash(password, salt);
        });
    },
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield userMutation_1.userMutation.deleteUserByIdInDb(id);
        });
    }
};
