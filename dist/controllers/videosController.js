"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAllVideosController = exports.getAllVideosController = exports.removeAllDataController = void 0;
const db_1 = require("../db/db");
const removeAllDataController = (req, res) => {
    const db = [];
    return res.status(204).json({ description: 'All data is deleted' });
};
exports.removeAllDataController = removeAllDataController;
const getAllVideosController = (req, res) => {
    const videosInDb = db_1.db;
    if (!videosInDb || videosInDb.length < 1) {
        return res.status(400);
    }
    return res.status(200).json(videosInDb);
};
exports.getAllVideosController = getAllVideosController;
//1 type of the params, 2)type of the response body, 3) type of the request body, 4) uri query params
const postAllVideosController = (req, res) => {
    const { title, author, availableResolutions } = req.body;
    const videosInDb = db_1.db;
    return res.status(200).json(videosInDb);
};
exports.postAllVideosController = postAllVideosController;
