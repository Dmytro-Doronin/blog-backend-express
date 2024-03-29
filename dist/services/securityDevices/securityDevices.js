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
const deviceMutation_1 = require("../../repositories/mutationRepositories/deviceMutation");
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
            return yield deviceMutation_1.deviceMutation.createDevice(newDevice);
        });
    },
    changeDevicesData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const { deviceId, lastActiveDate, expireDate } = yield jwtService_1.jwtService.verifyToken(token);
            return yield deviceMutation_1.deviceMutation.changeDeviceDataByDeviceId(deviceId, lastActiveDate, expireDate);
        });
    },
    deleteAllDeviceExcludeCurrent(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield deviceMutation_1.deviceMutation.deleteAllDeviceExcludeCurrent(deviceId);
        });
    },
    deleteDevice(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield deviceMutation_1.deviceMutation.deleteDeviceByDeviceId(deviceId);
        });
    }
};
