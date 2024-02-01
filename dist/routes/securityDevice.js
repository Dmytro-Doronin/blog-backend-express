"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = require("express");
const deviceController_1 = require("../controllers/deviceController");
exports.deviceRouter = (0, express_1.Router)();
exports.deviceRouter.get('/devices', deviceController_1.getAllDeviceController);
exports.deviceRouter.delete('/devices', deviceController_1.deleteAllDevicesExcludeCurrentController);
exports.deviceRouter.delete('/devices/:deviceId', deviceController_1.deleteSpecifiedDevice);
