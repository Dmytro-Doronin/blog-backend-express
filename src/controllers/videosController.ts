import * as express from "express";
import {postVideoType, ReturnedAddVideosError, UpdateInputVideoModel, VideoTypes} from "../types/video.types";
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

    if (!title || title.trim().length > 40 || !author || author.length > 20 || availableResolutions.length < 1) {
        return res.status(400).json({
            "errorsMessages": [
                {
                    message: "has incorrect values",
                    field: "field"
                }
            ]
        })
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
        title: currentTitle,
        author: currentAuthor,
        availableResolutions: currentResolution,
        canBeDownloaded: currentCanBeDownloaded,
        minAgeRestriction:currentAgeRestriction,
        publicationDate: currentPublicationDate
    } = req.body


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
        })
    }

    let currentVideo = db.find(item => item.id === +req.params.id)
    if (currentVideo) {
        currentVideo = {
            ...currentVideo,
            title: currentTitle,
            author: currentAuthor,
            minAgeRestriction: currentAgeRestriction,
            publicationDate: currentPublicationDate,
            canBeDownloaded: currentCanBeDownloaded
        }

        currentVideo.availableResolutions = currentResolution
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
