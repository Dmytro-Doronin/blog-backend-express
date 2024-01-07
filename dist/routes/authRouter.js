"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const usersController_1 = require("../controllers/usersController");
const express_1 = require("express");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', usersController_1.loginController);
