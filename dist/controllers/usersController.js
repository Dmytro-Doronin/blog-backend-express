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
exports.loginController = exports.deleteUserByIdController = exports.getAllUsersController = exports.createUserController = void 0;
const usersService_1 = require("../services/users/usersService");
const userQuery_1 = require("../repositories/queryRepositories/userQuery");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { login, email, password } = req.body;
    const user = yield usersService_1.usersService.createUser({ login, password, email });
    if (!user) {
        return res.sendStatus(400);
    }
    return res.status(201).send(user);
});
exports.createUserController = createUserController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize,
        searchLoginTerm: req.query.searchLoginTerm,
        searchEmailTerm: req.query.searchEmailTerm
    };
    const users = yield userQuery_1.userQuery.getAllUsers(sortData);
    return res.status(200).send(users);
});
exports.getAllUsersController = getAllUsersController;
const deleteUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield usersService_1.usersService.deleteUserById(req.params.id);
    if (result === null) {
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
});
exports.deleteUserByIdController = deleteUserByIdController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginOrEmail, password } = req.body;
    const result = yield usersService_1.usersService.checkCredentials(loginOrEmail, password);
    if (!result) {
        res.sendStatus(401);
        return;
    }
    res.sendStatus(204);
    return;
    // const result = await userQuery.findUserByLoginOrEmail()
});
exports.loginController = loginController;
