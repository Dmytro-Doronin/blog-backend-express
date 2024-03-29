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
exports.deleteSpecifiedDevice = exports.deleteAllDevicesExcludeCurrentController = exports.getAllDeviceController = void 0;
const deviceQuery_1 = require("../repositories/queryRepositories/deviceQuery");
const securityDevices_1 = require("../services/securityDevices/securityDevices");
const getAllDeviceController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = req.userId;
    const devices = yield deviceQuery_1.deviceQuery.getAllDevice(currentUserId);
    res.status(200).send(devices);
    return;
});
exports.getAllDeviceController = getAllDeviceController;
const deleteAllDevicesExcludeCurrentController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceId = req.deviceId;
    const result = yield securityDevices_1.securityDevicesService.deleteAllDeviceExcludeCurrent(deviceId);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.deleteAllDevicesExcludeCurrentController = deleteAllDevicesExcludeCurrentController;
const deleteSpecifiedDevice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deviceIdToDelete = req.params.deviceId;
    const currentUserId = req.userId;
    const device = yield deviceQuery_1.deviceQuery.getDeviceByDeviceId(deviceIdToDelete);
    if (!device) {
        res.sendStatus(404);
        return;
    }
    if (currentUserId !== device.userId) {
        res.sendStatus(403);
        return;
    }
    const result = yield securityDevices_1.securityDevicesService.deleteDevice(deviceIdToDelete);
    if (!result) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
    return;
});
exports.deleteSpecifiedDevice = deleteSpecifiedDevice;
