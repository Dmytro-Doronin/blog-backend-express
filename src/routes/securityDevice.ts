import {Router} from "express";
import {verifyTokenMiddleware} from "../middleware/verifyTokenMiddleware";
import {
    deleteAllDevicesExcludeCurrentController,
    deleteSpecifiedDevice,
    getAllDeviceController
} from "../controllers/deviceController";

export const deviceRouter = Router()

deviceRouter.get('/',  getAllDeviceController)
deviceRouter.delete('/',  deleteAllDevicesExcludeCurrentController)
deviceRouter.delete('/:deviceId',  deleteSpecifiedDevice)
