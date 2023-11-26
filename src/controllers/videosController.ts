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
export const addVideoController
    = (
        req: express.Request,
        res: express.Response
    ) => {

    let {title,author, availableResolutions } = req.body
    let errorObj: ReturnedAddVideosError = {
        errorsMessages: []
    }

    if (!title || title.trim().length < 1 || title.trim().length > 40) {
        errorObj.errorsMessages.push({message: "Title is required", field: "title"})
    }

    if (!author || author.trim().length < 1 || author.trim().length > 20) {
        errorObj.errorsMessages.push({message: "Author is required", field: "author"})
    }

    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(p => {
            !availableResolutions.includes(p) && errorObj.errorsMessages.push({
                message: "At least one resolution should be available",
                field: "availableResolutions"
            })
        })

    } else {
        availableResolutions = []
    }


    if (errorObj.errorsMessages.length) {
        res.status(400).send(errorObj)
        return
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

    if (!req.params.id) {
        res.sendStatus(404)
    }

    const currentVideo = db.find(item => item.id === +req.params.id)

    if (!currentVideo) {
        return res.status(404)
    }

    return res.status(200).json(currentVideo)

}

export const putVideoByIdController = (req: express.Request, res: express.Response) => {

    let {
        title,
        author,
        availableResolutions,
        canBeDownloaded,
        minAgeRestriction,
        publicationDate
    } = req.body

    const id = +req.params.id

    if (!id) {
        res.sendStatus(404)
    }

    let errorObj2: ReturnedAddVideosError = {
        errorsMessages: []
    }

    if (!title || title.trim().length < 1 || title.trim().length > 40) {
        errorObj2.errorsMessages.push({message: "Title is required", field: "title"})
    }

    if (!author || author.trim().length < 1 || author.trim().length > 20) {
        errorObj2.errorsMessages.push({message: "Author is required", field: "author"})
    }

    if (Array.isArray(availableResolutions)) {
        availableResolutions.map(p => {
            !availableResolutions.includes(p) && errorObj2.errorsMessages.push({
                message: "At least one resolution should be available",
                field: "availableResolutions"
            })
        })

    } else {
        availableResolutions = []
    }


    if (typeof minAgeRestriction !== 'undefined' || true ) {
        minAgeRestriction > 18 || minAgeRestriction < 1 && errorObj2.errorsMessages.push({message: "Not currentAgeRestriction range", field: "currentAgeRestriction"})
    } else {
        minAgeRestriction = null
    }

    if (typeof canBeDownloaded === 'undefined') {
        canBeDownloaded = false
    }

    if (!publicationDate) {
        errorObj2.errorsMessages.push({message: "Not publicationDate", field: "publicationDate"})
    }

    if (errorObj2.errorsMessages.length > 0) {
        res.status(400).send(errorObj2);
        return

    }
    // || currentTitle.trim().length > 40
    // || !currentAuthor || currentAuthor.length > 20
    // || currentResolution.length < 1
    // || currentAgeRestriction > 18 || currentAgeRestriction < 1
    // || !currentPublicationDate

    const currentVideoIndex = db.findIndex(v => v.id === id)
    let currentVideo = db.find(item => item.id === +req.params.id)

    if (!currentVideo) {
        res.sendStatus(404)
        return
    }

        const updatedCurrentVideo = {
            ...currentVideo,
            title: title,
            author: author,
            minAgeRestriction: minAgeRestriction,
            publicationDate: publicationDate,
            canBeDownloaded: canBeDownloaded,
            availableResolutions: availableResolutions ? availableResolutions : currentVideo.availableResolutions
        }

        db.splice(currentVideoIndex, 1, updatedCurrentVideo)

        return res.sendStatus(204)

}

export const deleteVideoController = (req: express.Request, res: express.Response) => {

    const id = +req.params.id

    if (!id) {
        res.sendStatus(404)
    }

    const indexCurrentVideo = db.findIndex(v => v.id === id)
    const currentVideo = db.find(item => item.id === id)

    if (!currentVideo) {
        res.sendStatus(404)
        return
    }

    db.splice(indexCurrentVideo, 1)

    return res.sendStatus(204)
}
