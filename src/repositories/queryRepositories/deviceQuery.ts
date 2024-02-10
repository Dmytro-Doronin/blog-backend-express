import {deviceMapper} from "../../utils/mapper";
import {DeviceModel} from "../../db/schemes";

export const deviceQuery = {
    async getAllDevice (currentUserId: string) {
        try {
            const devices = await DeviceModel.find({userId: currentUserId}).lean()

            return devices.map(deviceMapper)
        } catch (e) {
            throw new Error('Can not get all data')
        }

    },

    async getDeviceByActiveDataAndUserId (lastActiveDate: Date, deviceId: string) {
        try {
            const device = await DeviceModel.findOne(
                {
                    deviceId:deviceId,
                    lastActiveDate: lastActiveDate
                }
            ).lean()

            if (!device) {
                return false
            }

            return device

        } catch (e) {
            throw new Error('Can not find device')

        }
    },
    async getDeviceByDeviceId (deviceId: string) {
        try {
            const device = await DeviceModel.findOne(
                {deviceId:deviceId}
            ).lean()

            if (!device) {
                return false
            }

            return device

        } catch (e) {
            throw new Error('Can not find device')

        }
    }
}