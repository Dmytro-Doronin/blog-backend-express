import {Router} from "express";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";
import {
    deleteAllDevicesExcludeCurrentController,
    deleteSpecifiedDevice,
    getAllDeviceController
} from "../controllers/deviceController";

export const deviceRouter = Router()

deviceRouter.get('/devices',  getAllDeviceController)
deviceRouter.delete('/devices',  deleteAllDevicesExcludeCurrentController)
deviceRouter.delete('/devices/:deviceId', deleteSpecifiedDevice)
