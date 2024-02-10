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
exports.deviceMutation = void 0;
const schemes_1 = require("../../db/schemes");
exports.deviceMutation = {
    createDevice(device) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.DeviceModel.create(device);
                const result = yield schemes_1.DeviceModel.findOne({ lastActiveDate: device.lastActiveDate }).lean();
                if (!result) {
                    return null;
                }
                return result;
            }
            catch (e) {
                throw new Error('Device was not created');
            }
        });
    },
    changeDeviceDataByDeviceId(deviceId, lastActiveDate, expireDate) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deviceInDb = yield schemes_1.DeviceModel.findOne({ deviceId }).lean();
                if (!deviceInDb) {
                    return null;
                }
                const result = yield schemes_1.DeviceModel.updateOne({ deviceId }, { $set: { lastActiveDate, expireDate } });
                return result.modifiedCount === 1;
            }
            catch (e) {
                throw new Error('Can not update device');
            }
        });
    },
    deleteAllDeviceExcludeCurrent(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield schemes_1.DeviceModel.deleteMany({ deviceId: { $ne: deviceId } });
                const count = yield schemes_1.DeviceModel.countDocuments({});
                return count === 1;
            }
            catch (e) {
                throw new Error('Can not delete devices');
            }
        });
    },
    deleteDeviceByDeviceId(deviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield schemes_1.DeviceModel.deleteOne({ deviceId: deviceId });
                return result.deletedCount === 1;
            }
            catch (e) {
                throw new Error('Can not delete device by deviceId');
            }
        });
    }
};
