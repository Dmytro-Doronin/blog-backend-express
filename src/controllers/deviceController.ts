import {Request, Response} from "express";
import {deviceQuery} from "../repositories/queryRepositories/deviceQuery";
import {securityDevicesService} from "../services/securityDevices/securityDevices";
import {RequestWithParams} from "../types/commonBlogTypeAndPosts.types";

export const getAllDeviceController = async (req: Request, res: Response) => {

    const devices = await deviceQuery.getAllDevice()

    return res.status(200).send(devices)
}

export const deleteAllDevicesExcludeCurrentController = async (req: Request, res: Response) => {

    const deviceId = req.tokenData.deviceId

    const result = await securityDevicesService.deleteAllDeviceExcludeCurrent(deviceId)

    if (!result) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
    return
}

export const deleteSpecifiedDevice = async (req: RequestWithParams<{deviceId: string}> , res: Response) => {
    const currentDeviceId = req.tokenData.deviceId
    const deviceIdToDelete = req.params.deviceId

    if (currentDeviceId !== deviceIdToDelete) {
        res.sendStatus(403)
        return
    }

    const result = await securityDevicesService.deleteDevice(deviceIdToDelete)

    if (!result) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
    return

}