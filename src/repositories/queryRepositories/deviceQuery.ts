import {dbDeviceCollections} from "../../db/dbCollections";
import {deviceMapper} from "../../utils/mapper";

export const deviceQuery = {
    async getAllDevice () {
        try {
            const devices = await dbDeviceCollections.find({}).toArray()

            return devices.map(deviceMapper)
        } catch (e) {
            throw new Error('Can not get all data')
        }

    },

    async getDeviceByActiveDataAndUserId (lastActiveDate: Date, deviceId: string) {
        try {
            const device = await dbDeviceCollections.findOne(
                {
                    deviceId:deviceId,
                    lastActiveDate: lastActiveDate
                }
            )

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
            const device = await dbDeviceCollections.findOne(
                {deviceId:deviceId}
            )

            if (!device) {
                return false
            }

            return device

        } catch (e) {
            throw new Error('Can not find device')

        }
    }
}