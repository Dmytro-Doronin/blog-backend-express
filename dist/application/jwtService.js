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
exports.jwtService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const variables_1 = require("../variables");
const blackListMutation_1 = require("../repositories/mutationRepositories/blackListMutation");
const blackListQuery_1 = require("../repositories/queryRepositories/blackListQuery");
const { v4: uuidv4 } = require('uuid');
exports.jwtService = {
    createJWTAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, variables_1.setting.JWT_SECRET, { expiresIn: '10s' });
            return {
                accessToken: token
            };
        });
    },
    createJWTRefreshToken(user, deviceId = uuidv4()) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentDate = new Date();
            const currentDateStr = currentDate.toISOString();
            const refreshToken = jsonwebtoken_1.default.sign({
                userId: user.id,
                lastActiveDate: currentDateStr,
                expireDate: new Date(currentDate.getTime() + 20 * 1000).toISOString(),
                deviceId: deviceId
            }, variables_1.setting.JWT_SECRET, { expiresIn: '20s' });
            return refreshToken;
        });
    },
    getUserIdByToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, variables_1.setting.JWT_SECRET);
                return result.userId;
            }
            catch (e) {
                return false;
            }
        });
    },
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = jsonwebtoken_1.default.verify(token, variables_1.setting.JWT_SECRET);
                return result;
            }
            catch (e) {
                return false;
            }
        });
    },
    isTokenBlacklisted(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield blackListQuery_1.blackListQuery.checkTokenInBlackList(token);
            if (!result) {
                return null;
            }
            return true;
        });
    },
    putTokenToTheBlackList(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield blackListMutation_1.blackListMutation.putTokenInBlackList(token);
        });
    },
};
