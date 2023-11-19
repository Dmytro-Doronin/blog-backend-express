import * as express from "express";
import {postVideoType, videoTypes} from "../types/video.types";
import {db} from "../db";

export const removeAllDataController = (req: Request, res: Response) => {

    const db = []

    return res.status(204).json({description: 'All data is deleted'})
}
export const getAllVideosController = (req: Request, res: Response) => {

    const videosInDb = db

    if (!usersInDb || videosInDb.length < 1) {
        return res.status(404).json({message: 'Videos not found'})
    }

    return res.status(200).json(videosInDb)
}


//1 type of the params, 2)type of the response body, 3) type of the request body, 4) uri query params
export const postAllVideosController: express.RequestHandler<Record<string, any>, videoTypes, postVideoType, unknown>
    = (
        req,
        res
)
    => {
    if ()

    const {title,author, availableResolutions } = req.body

    const videosInDb = db


    return res.status(200).json(videosInDb)
}

