import {DeviceDBType} from "../../types/commonBlogTypeAndPosts.types";
import {dbDeviceCollections} from "../../db/dbCollections";

export const deviceMutation = {
    async createDevice (device: DeviceDBType) {
        try {
            await dbDeviceCollections.insertOne(device)
            const result = await dbDeviceCollections.findOne({lastActiveDate: device.lastActiveDate})
            if (!result) {
                return null
            }

            return result
        } catch (e) {
            throw new Error('Device was not created')
        }
    },

    async changeDeviceDataByDeviceId (deviceId: string, lastActiveDate: Date, expireDate: Date) {
        try {

            const deviceInDb = await dbDeviceCollections.findOne({deviceId})

            if (deviceInDb) {
                return null
            }

            const result = await dbDeviceCollections.updateOne(
                {deviceId},
                {$set: {lastActiveDate, expireDate}}
            )

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Can not update device')
        }
    },

    async deleteAllDeviceExcludeCurrent (deviceId: string) {
        try {

            await dbDeviceCollections.deleteMany({deviceId: {$ne: deviceId}})

            const count = await dbDeviceCollections.countDocuments({})

            return count === 1;

        } catch (e) {
            throw new Error('Can not delete devices')
        }
    },

    async deleteDeviceByDeviceId (deviceId: string) {
        try {
            const result = await dbDeviceCollections.deleteOne({deviceId})

            return result.deletedCount === 1
        } catch (e) {
            throw new Error('Can not delete device by deviceId')
        }
    }
}