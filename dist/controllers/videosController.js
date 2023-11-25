"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = exports.putVideoByIdController = exports.getVideoByIdController = exports.addVideoController = exports.getAllVideosController = exports.removeAllDataController = exports.db = void 0;
// import {db} from "../db/db";
const { v4: uuidv4 } = require('uuid');
exports.db = [];
//delete all
const removeAllDataController = (req, res) => {
    exports.db = [];
    return res.status(404);
};
exports.removeAllDataController = removeAllDataController;
//get
const getAllVideosController = (req, res) => {
    return res.status(200).json(exports.db);
};
exports.getAllVideosController = getAllVideosController;
//post
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
        minAgeRestriction: 1,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions
    };
    exports.db.push(NewVideo);
    const addedVideo = exports.db.find(item => item.id === NewVideo.id);
    return res.status(201).json(addedVideo);
};
exports.addVideoController = addVideoController;
const getVideoByIdController = (req, res) => {
    const currentVideo = exports.db.find(item => item.id === +req.params.id);
    if (!currentVideo) {
        return res.status(404);
    }
    return res.status(200).json(currentVideo);
};
exports.getVideoByIdController = getVideoByIdController;
const putVideoByIdController = (req, res) => {
    const { title: currentTitle, author: currentAuthor, availableResolutions: currentResolution, canBeDownloaded: currentCanBeDownloaded, minAgeRestriction: currentAgeRestriction, publicationDate: currentPublicationDate } = req.body;
    if (!currentTitle || currentTitle.trim().length > 40
        || !currentAuthor || currentAuthor.length > 20
        || currentResolution.length < 1
        || currentAgeRestriction > 18 || currentAgeRestriction < 1
        || !currentPublicationDate) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        });
    }
    let currentVideo = exports.db.find(item => item.id === +req.params.id);
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
    const currentVideo = exports.db.find(item => item.id === id);
    if (!currentVideo) {
        return res.status(404);
    }
    return res.status(204);
};
exports.deleteVideoController = deleteVideoController;
