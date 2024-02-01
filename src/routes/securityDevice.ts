import {Router} from "express";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";
import {
    deleteAllDevicesExcludeCurrentController,
    deleteSpecifiedDevice,
    getAllDeviceController
} from "../controllers/deviceController";

export const deviceRouter = Router()

deviceRouter.get('/', verifyTokenMiddleware, getAllDeviceController)
deviceRouter.delete('/', verifyTokenMiddleware, deleteAllDevicesExcludeCurrentController)
deviceRouter.delete('/:deviceId', verifyTokenMiddleware, deleteSpecifiedDevice)
