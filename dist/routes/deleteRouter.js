"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRouter = void 0;
const express_1 = require("express");
const deleteController_1 = require("../controllers/deleteController");
exports.deleteRouter = (0, express_1.Router)();
exports.deleteRouter.delete('/', deleteController_1.removeAllDataController);
