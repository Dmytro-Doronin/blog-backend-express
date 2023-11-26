"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = exports.putVideoByIdController = exports.getVideoByIdController = exports.addVideoController = exports.getAllVideosController = exports.removeAllDataController = exports.db = void 0;
// import {db} from "../db/db";
const { v4: uuidv4 } = require('uuid');
exports.db = [];
//delete all
const removeAllDataController = (req, res) => {
    exports.db = [];
    return res.status(204).json(exports.db);
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
    if (!title) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "Title is required",
                    field: "title"
                }
            ]
        });
    }
    if (title.trim().length > 40) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "Title length should be less than or equal to 40 characters",
                    field: "title"
                }
            ]
        });
    }
    if (!author) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "Author is required",
                    field: "author"
                }
            ]
        });
    }
    if (author.length > 20) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "Author length should be less than or equal to 20 characters",
                    field: "author"
                }
            ]
        });
    }
    if (availableResolutions.length < 1) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "At least one resolution should be available",
                    field: "availableResolutions"
                }
            ]
        });
    }
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const isoStringWithAddedDay = tomorrowDate.toISOString();
    const NewVideo = {
        id: (+new Date() * 1000),
        title,
        canBeDownloaded: false,
        author,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: isoStringWithAddedDay,
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
    // || currentTitle.trim().length > 40
    // || !currentAuthor || currentAuthor.length > 20
    // || currentResolution.length < 1
    // || currentAgeRestriction > 18 || currentAgeRestriction < 1
    // || !currentPublicationDate
    if (!currentTitle) {
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
        return res.status(204).send(currentVideo);
    }
    else {
        return res.send(404);
    }
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
