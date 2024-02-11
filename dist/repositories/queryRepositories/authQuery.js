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
exports.authQuery = void 0;
const schemes_1 = require("../../db/schemes");
exports.authQuery = {
    getUserByConfirmationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield schemes_1.UserModel.findOne({ "emailConfirmation.confirmationCode": code }).lean();
                if (!user) {
                    return null;
                }
                return user;
            }
            catch (e) {
                throw new Error('User was not found');
            }
        });
    },
    getUserByRecoveryPasswordCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield schemes_1.UserModel.findOne({ "passwordRecovery.passwordRecoveryCode": code }).lean();
                if (!user) {
                    return null;
                }
                return user;
            }
            catch (e) {
                throw new Error('User was not found');
            }
        });
    },
};
