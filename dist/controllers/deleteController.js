"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAllDataController = void 0;
const db_1 = require("../db/db");
const removeAllDataController = (req, res) => {
    db_1.blogDB.blogs.length = 0;
    db_1.blogDB.posts = [];
    res.sendStatus(204);
    return;
};
exports.removeAllDataController = removeAllDataController;
