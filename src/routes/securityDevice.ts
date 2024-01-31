import {Router} from "express";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";
import {
    deleteAllDevicesExcludeCurrentController,
    deleteSpecifiedDevice,
    getAllDeviceController
} from "../controllers/deviceController";

export const deviceRouter = Router()

deviceRouter.get('/devices', verifyTokenMiddleware, getAllDeviceController)
deviceRouter.delete('/devices', verifyTokenMiddleware, deleteAllDevicesExcludeCurrentController)
deviceRouter.delete('/devices/:deviceId', verifyTokenMiddleware, deleteSpecifiedDevice)
