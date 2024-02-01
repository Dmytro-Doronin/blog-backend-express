"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deviceRouter = void 0;
const express_1 = require("express");
const deviceController_1 = require("../controllers/deviceController");
exports.deviceRouter = (0, express_1.Router)();
exports.deviceRouter.get('/', deviceController_1.getAllDeviceController);
exports.deviceRouter.delete('/', deviceController_1.deleteAllDevicesExcludeCurrentController);
exports.deviceRouter.delete('/:deviceId', deviceController_1.deleteSpecifiedDevice);
