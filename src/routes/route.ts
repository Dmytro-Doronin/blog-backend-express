import {Router} from 'express'
import {getAllVideosController, removeAllDataController} from "../controllers/videosController";

export const videoRouter = Router()

videoRouter.get('/testing/all-data', removeAllDataController)
videoRouter.get('/videos', getAllVideosController)
videoRouter.get('/videos', getAllVideosController)

