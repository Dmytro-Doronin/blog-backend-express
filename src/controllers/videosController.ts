import * as express from "express";
import {postVideoType, ReturnedAddVideosError, UpdateInputVideoModel, VideoTypes, VideoResolution} from "../types/video.types";
import {db} from "../db/db";
const { v4: uuidv4 } = require('uuid');


export const removeAllDataController = (req: express.Request, res: express.Response) => {

    const db = []

    return res.status(204).json({description: 'All data is deleted'})
}
export const getAllVideosController = (req: express.Request, res: express.Response) => {

    const videosInDb = db

    if (!videosInDb || videosInDb.length < 1) {
        return res.status(400)
    }

    return res.status(200).json(videosInDb)
}


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

    const NewVideo: VideoTypes  = {
        id: uuidv4(),
        title,
        canBeDownloaded: false,
        author,
        minAgeRestriction: 1,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
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

export const putVideoByIdController: express.RequestHandler<Record<string, any>, ReturnedAddVideosError, UpdateInputVideoModel, unknown> = (req, res) => {

    const {
        title: currentTitle,
        author: currentAuthor,
        availableResolutions: currentResolution,
        canBeDownloaded: currentCanBeDownloaded,
        minAgeRestriction:currentAgeRestriction,
        publicationDate: currentPublicationDate
    } = req.body


    if (!currentTitle || currentTitle.trim().length > 40
        || !currentAuthor || currentAuthor.length > 20
        || currentResolution.length < 1
        || currentAgeRestriction > 18 || currentAgeRestriction < 1
        || !currentPublicationDate
    ) {
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
        return res.status(404)
    }

    return res.status(204)
}

export const deleteVideoController = (req: express.Request, res: express.Response) => {

    const id = +req.params.id

    const currentVideo = db.find(item => item.id === id)

    if (!currentVideo) {
        return res.status(404)
    }

    return res.status(204)
}
