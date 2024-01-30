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
exports.securityDevicesService = void 0;
const jwtService_1 = require("../../application/jwtService");
exports.securityDevicesService = {
    createDevice(token, ip = 'No ip', title = 'No title') {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, lastActiveDate, expireDate, deviceId } = yield jwtService_1.jwtService.verifyToken(token);
            const newDevice = {
                deviceId: deviceId,
                userId: userId,
                lastActiveDate: lastActiveDate,
                expireDate: expireDate,
                ip: ip,
                title: title,
            };
        });
    }
};
