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
exports.authMutation = void 0;
const schemes_1 = require("../../db/schemes");
exports.authMutation = {
    updateConfirmation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield schemes_1.UserModel.updateOne({ id }, { $set: { "emailConfirmation.isConfirmed": true } });
            return result.modifiedCount === 1;
        });
    },
    updateConfirmationCode(id, code, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield schemes_1.UserModel.updateOne({ id }, { $set: {
                        "emailConfirmation.confirmationCode": code,
                        "emailConfirmation.expirationDate": date
                    } });
                return result.modifiedCount === 1;
            }
            catch (e) {
                throw new Error('Confirmation was not changed');
            }
        });
    },
    updatePasswordRecoveryCode(id, code, date) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield schemes_1.UserModel.updateOne({ id }, { $set: {
                        "passwordRecovery.passwordRecoveryCode": code,
                        "passwordRecovery.expirationDate": date
                    } });
                return result.modifiedCount === 1;
            }
            catch (e) {
                throw new Error('Confirmation was not changed');
            }
        });
    },
    updatePassword(passwordSalt, passwordHash, recoveryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield schemes_1.UserModel.findOne({ "passwordRecovery.passwordRecoveryCode": recoveryCode }).lean();
                if (!user) {
                    return false;
                }
                const result = yield schemes_1.UserModel.updateOne({ id: user.id }, { $set: {
                        "accountData.passwordHash": passwordHash,
                        "accountData.passwordSalt": passwordSalt
                    } });
                return result.modifiedCount === 1;
            }
            catch (e) {
                throw new Error('Confirmation was not changed');
            }
        });
    }
};
