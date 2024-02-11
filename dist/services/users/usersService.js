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
exports.usersService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userMutation_1 = require("../../repositories/mutationRepositories/userMutation");
const userQuery_1 = require("../../repositories/queryRepositories/userQuery");
const date_fns_1 = require("date-fns");
const mapper_1 = require("../../utils/mapper");
const { v4: uuidv4 } = require('uuid');
exports.usersService = {
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
            const user = yield userMutation_1.userMutation.createUser(newUser);
            if (!user) {
                return null;
            }
            return (0, mapper_1.userMapper)(user);
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield userQuery_1.userQuery.findUserByLoginOrEmail(loginOrEmail);
            if (!user)
                return false;
            const passwordHash = yield this._generateHash(password, user.accountData.passwordSalt);
            if (user.accountData.passwordHash === passwordHash) {
                return (0, mapper_1.userMapper)(user);
            }
            else {
                return false;
            }
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
