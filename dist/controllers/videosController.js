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
    const errorObj = {
        errorsMessages: []
    };
    if (!title) {
        errorObj.errorsMessages.push({ message: "Title is required", field: "title" });
    }
    if (title.trim().length > 40) {
        errorObj.errorsMessages.push({ message: "Title length should be less than or equal to 40 characters", field: "title" });
    }
    if (!author) {
        errorObj.errorsMessages.push({ message: "Author is required", field: "author" });
    }
    if (author.length > 20) {
        errorObj.errorsMessages.push({ message: "Author length must be less then 20", field: "author" });
    }
    if (availableResolutions.length < 1) {
        errorObj.errorsMessages.push({ message: "At least one resolution should be available", field: "availableResolutions" });
    }
    if (errorObj.errorsMessages.length > 0) {
        return res.status(400).json(errorObj);
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
    const { title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate } = req.body;
    const id = +req.params.id;
    const errorObj = {
        errorsMessages: []
    };
    if (!title || title.trim().length > 40) {
        errorObj.errorsMessages.push({ message: "Title is required", field: "title" });
    }
    if (!author || author.length > 20) {
        errorObj.errorsMessages.push({ message: "Author is required", field: "author" });
    }
    if (availableResolutions.length < 1) {
        errorObj.errorsMessages.push({ message: "At least one resolution should be available", field: "availableResolutions" });
    }
    if (minAgeRestriction > 18 || minAgeRestriction < 1) {
        errorObj.errorsMessages.push({ message: "Not currentAgeRestriction range", field: "currentAgeRestriction" });
    }
    if (!minAgeRestriction) {
        errorObj.errorsMessages.push({ message: "Not currentPublicationDate", field: "currentPublicationDate" });
    }
    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        errorObj.errorsMessages.push({ message: "Not canBeDownloaded", field: "canBeDownloaded" });
    }
    if (!publicationDate) {
        errorObj.errorsMessages.push({ message: "Not publicationDate", field: "publicationDate" });
    }
    if (errorObj.errorsMessages.length > 0) {
        return res.status(400).json(errorObj);
    }
    // || currentTitle.trim().length > 40
    // || !currentAuthor || currentAuthor.length > 20
    // || currentResolution.length < 1
    // || currentAgeRestriction > 18 || currentAgeRestriction < 1
    // || !currentPublicationDate
    const currentVideoIndex = exports.db.findIndex(v => v.id === id);
    let currentVideo = exports.db.find(item => item.id === +req.params.id);
    if (!currentVideo) {
        res.sendStatus(404);
        return;
    }
    const updatedCurrentVideo = Object.assign(Object.assign({}, currentVideo), { title: title, author: author, minAgeRestriction: minAgeRestriction, publicationDate: publicationDate, canBeDownloaded: canBeDownloaded, availableResolutions: availableResolutions ? availableResolutions : currentVideo.availableResolutions });
    exports.db.splice(currentVideoIndex, 1, updatedCurrentVideo);
    return res.sendStatus(204);
};
exports.putVideoByIdController = putVideoByIdController;
const deleteVideoController = (req, res) => {
    const id = +req.params.id;
    const indexCurrentVideo = exports.db.findIndex(v => v.id === id);
    const currentVideo = exports.db.find(item => item.id === id);
    if (!currentVideo) {
        res.sendStatus(404);
        return;
    }
    exports.db.splice(indexCurrentVideo, 1);
    return res.sendStatus(204);
};
exports.deleteVideoController = deleteVideoController;
