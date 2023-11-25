import {Router} from 'express'
import {
    addVideoController,
    getAllVideosController,
    getVideoByIdController,
    removeAllDataController
} from "../controllers/videosController";

export const videoRouter = Router()

videoRouter.delete('/testing/all-data', removeAllDataController)
videoRouter.get('/videos', getAllVideosController)
videoRouter.post('/videos', addVideoController)
videoRouter.get('/videos/:id', getVideoByIdController)

