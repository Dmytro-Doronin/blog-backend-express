"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const loginController_1 = require("../controllers/loginController");
const blogsMiddleware_1 = require("../middleware/blogsMiddleware");
const loginValidationModel_1 = require("../validation/loginValidationModel");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.post('/login', (0, loginValidationModel_1.loginValidationModelMiddleware)(), blogsMiddleware_1.errorMiddleware, loginController_1.loginController);
