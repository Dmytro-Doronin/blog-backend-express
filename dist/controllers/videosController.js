"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = exports.putVideoByIdController = exports.getVideoByIdController = exports.addVideoController = exports.getAllVideosController = exports.removeAllDataController = void 0;
const db_1 = require("../db/db");
const { v4: uuidv4 } = require('uuid');
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
    return res.status(200).send(videosInDb);
};
exports.getAllVideosController = getAllVideosController;
//1 type of the params, 2)type of the response body, 3) type of the request body, 4) uri query params
const addVideoController = (req, res) => {
    const { title, author, availableResolutions } = req.body;
    if (!title || title.trim().length > 40 || !author || author.length > 20 || availableResolutions.length < 1) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "has incorrect values",
                    field: "field"
                }
            ]
        });
    }
    const NewVideo = {
        id: uuidv4(),
        title,
        canBeDownloaded: false,
        author,
        minAgeRestriction: 16,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString() + 1,
        availableResolutions
    };
    db_1.db.push(NewVideo);
    const addedVideo = db_1.db.find(item => item.id === NewVideo.id);
    return res.status(200).send(addedVideo);
};
exports.addVideoController = addVideoController;
const getVideoByIdController = (req, res) => {
    const currentVideo = db_1.db.find(item => item.id === +req.params.id);
    if (!currentVideo) {
        return res.status(404);
    }
    return res.status(200).send(currentVideo);
};
exports.getVideoByIdController = getVideoByIdController;
const putVideoByIdController = (req, res) => {
    const { title: currentTitle, author: currentAuthor, availableResolutions: currentResolution, canBeDownloaded: currentCanBeDownloaded, minAgeRestriction: currentAgeRestriction, publicationDate: currentPublicationDate } = req.body;
    if (!currentTitle || currentTitle.trim().length > 40
        || !currentAuthor || currentAuthor.length > 20
        || currentResolution.length < 1
        || currentAgeRestriction > 18 || currentAgeRestriction < 1
        || !currentPublicationDate) {
        return res.status(400).send({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        });
    }
    let currentVideo = db_1.db.find(item => item.id === +req.params.id);
    if (currentVideo) {
        currentVideo = Object.assign(Object.assign({}, currentVideo), { title: currentTitle, author: currentAuthor, minAgeRestriction: currentAgeRestriction, publicationDate: currentPublicationDate, canBeDownloaded: currentCanBeDownloaded });
        currentVideo.availableResolutions = currentResolution;
        return res.status(404);
    }
    return res.status(204);
};
exports.putVideoByIdController = putVideoByIdController;
const deleteVideoController = (req, res) => {
    const id = +req.params.id;
    const currentVideo = db_1.db.find(item => item.id === id);
    if (!currentVideo) {
        return res.status(404);
    }
    return res.status(204);
};
exports.deleteVideoController = deleteVideoController;
