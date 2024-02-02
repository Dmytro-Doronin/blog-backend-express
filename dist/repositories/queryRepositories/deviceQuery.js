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
exports.deviceQuery = void 0;
const dbCollections_1 = require("../../db/dbCollections");
const mapper_1 = require("../../utils/mapper");
exports.deviceQuery = {
    getAllDevice(currentUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const devices = yield dbCollections_1.dbDeviceCollections.find({ userId: currentUserId }).toArray();
                return devices.map(mapper_1.deviceMapper);
            }
            catch (e) {
                throw new Error('Can not get all data');
            }
        });
    },
    getDeviceByActiveDataAndUserId(lastActiveDate, deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const device = yield dbCollections_1.dbDeviceCollections.findOne({
                    deviceId: deviceId,
                    lastActiveDate: lastActiveDate
                });
                if (!device) {
                    return false;
                }
                return device;
            }
            catch (e) {
                throw new Error('Can not find device');
            }
        });
    },
    getDeviceByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const device = yield dbCollections_1.dbDeviceCollections.findOne({ deviceId: deviceId });
                if (!device) {
                    return false;
                }
                return device;
            }
            catch (e) {
                throw new Error('Can not find device');
            }
        });
    }
};
