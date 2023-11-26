import * as express from "express";
import {
    postVideoType,
    ResolutionsType,
    ReturnedAddVideosError,
    UpdateInputVideoModel, VideoResolution,
    VideoTypes
} from "../types/video.types";
// import {db} from "../db/db";


const { v4: uuidv4 } = require('uuid');

export let db: VideoTypes[] = []
//delete all
export const removeAllDataController = (req: express.Request, res: express.Response) => {

    db = []

    return res.status(204).json(db)
}

//get
export const getAllVideosController = (req: express.Request, res: express.Response) => {

    return res.status(200).json(db)
}
//post
//1 type of the params, 2)type of the response body, 3) type of the request body, 4) uri query params
export const addVideoController: express.RequestHandler<Record<string, any>, VideoTypes | ReturnedAddVideosError, postVideoType, unknown>
    = (
        req,
        res
    ) => {

    const {title,author, availableResolutions } = req.body

    const errorObj: ReturnedAddVideosError = {
        errorsMessages: []
    }

    if (!title) {
        errorObj.errorsMessages.push({message: "Title is required", field: "title"})
    }

    if (title.trim().length > 40) {
        errorObj.errorsMessages.push({message: "Title length should be less than or equal to 40 characters", field: "title"})
    }

    if (!author) {
        errorObj.errorsMessages.push({message: "Author is required", field: "author"})
    }

    if (author.length > 20) {
        errorObj.errorsMessages.push({message: "Author length must be less then 20", field: "author"})
    }

    if (availableResolutions.length < 1) {
        errorObj.errorsMessages.push({message: "At least one resolution should be available", field: "availableResolutions"})
    }

    if (errorObj.errorsMessages.length > 0) {
        return res.status(400).json(errorObj);
    }

    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);
    const isoStringWithAddedDay = tomorrowDate.toISOString();

    const NewVideo: VideoTypes  = {
        id: (+new Date() * 1000),
        title,
        canBeDownloaded: false,
        author,
        minAgeRestriction: null,
        createdAt: currentDate.toISOString(),
        publicationDate: isoStringWithAddedDay,
        availableResolutions
    }

    db.push(NewVideo)

    const addedVideo = db.find(item => item.id === NewVideo.id)

    return res.status(201).json(addedVideo)
}

export const getVideoByIdController = (req: express.Request, res: express.Response) => {

    const currentVideo = db.find(item => item.id === +req.params.id)

    if (!currentVideo) {
        return res.status(404)
    }

    return res.status(200).json(currentVideo)

}

export const putVideoByIdController = (req: express.Request, res: express.Response) => {

    const {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate
    } = req.body

    const errorObj: ReturnedAddVideosError = {
        errorsMessages: []
    }

    if (!title || title.trim().length > 40) {
        errorObj.errorsMessages.push({message: "Title is required", field: "title"})
    }

    if (!author || author.length > 20) {
        errorObj.errorsMessages.push({message: "Author is required", field: "author"})
    }

    if (availableResolutions.length < 1) {
        errorObj.errorsMessages.push({message: "At least one resolution should be available", field: "availableResolutions"})
    }

    if (minAgeRestriction > 18 || minAgeRestriction < 1) {
        errorObj.errorsMessages.push({message: "Not currentAgeRestriction range", field: "currentAgeRestriction"})
    }
    if (!minAgeRestriction ) {
        errorObj.errorsMessages.push({message: "Not currentPublicationDate", field: "currentPublicationDate"})
    }

    if (!canBeDownloaded || typeof canBeDownloaded !== 'boolean') {
        errorObj.errorsMessages.push({message: "Not canBeDownloaded", field: "canBeDownloaded"})
    }

    if (!publicationDate) {
        errorObj.errorsMessages.push({message: "Not publicationDate", field: "publicationDate"})
    }

    if (errorObj.errorsMessages.length > 0) {
        return res.status(400).json(errorObj);
    }
    // || currentTitle.trim().length > 40
    // || !currentAuthor || currentAuthor.length > 20
    // || currentResolution.length < 1
    // || currentAgeRestriction > 18 || currentAgeRestriction < 1
    // || !currentPublicationDate


    let currentVideo = db.find(item => item.id === +req.params.id)
    if (currentVideo) {


        currentVideo = {
            ...currentVideo,
            title,
            author,
            minAgeRestriction,
            publicationDate,
            canBeDownloaded,
            availableResolutions
        }

        return res.status(204).send(currentVideo)
    } else {
        return res.send(404)
    }
}

export const deleteVideoController = (req: express.Request, res: express.Response) => {

    const id = +req.params.id

    const currentVideo = db.find(item => item.id === id)

    if (!currentVideo) {
        return res.status(404)
    }

    return res.status(204)
}
