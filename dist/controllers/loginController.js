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
exports.loginController = void 0;
const usersService_1 = require("../services/users/usersService");
const jwtService_1 = require("../application/jwtService");
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const user = yield usersService_1.usersService.checkCredentials(loginOrEmail, password);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const token = yield jwtService_1.jwtService.createJWT(user);
    res.status(200).send(token);
    return;
    // const result = await userQuery.findUserByLoginOrEmail()
});
exports.loginController = loginController;
