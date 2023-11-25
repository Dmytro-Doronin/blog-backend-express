import {Router} from 'express'
import {
    addVideoController, deleteVideoController,
    getAllVideosController,
    getVideoByIdController,
    putVideoByIdController,
    removeAllDataController,
} from "../controllers/videosController";

export const videoRouter = Router()

videoRouter.get('/videos', getAllVideosController)
videoRouter.post('/videos', addVideoController)
videoRouter.get('/videos/:id', getVideoByIdController)
videoRouter.put('/videos/:id', putVideoByIdController)
videoRouter.delete('/videos/:id', deleteVideoController)
videoRouter.delete('/testing/all-data', removeAllDataController)
