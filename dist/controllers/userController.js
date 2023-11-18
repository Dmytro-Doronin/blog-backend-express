"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUserController = void 0;
const index_1 = require("../index");
const getAllUserController = (req, res) => {
    const usersInDb = index_1.db.users;
    if (!usersInDb) {
        return res.status(404).json({ message: 'Users not found' });
    }
    return res.status(200).json(usersInDb);
};
exports.getAllUserController = getAllUserController;
