import {DeviceDBType} from "../../types/commonBlogTypeAndPosts.types";
import {DeviceModel} from "../../db/schemes";

export const deviceMutation = {
    async createDevice (device: DeviceDBType) {
        try {
            await DeviceModel.create(device)
            const result = await DeviceModel.findOne({lastActiveDate: device.lastActiveDate}).lean()
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

            const deviceInDb = await DeviceModel.findOne({deviceId}).lean()

            if (!deviceInDb) {
                return null
            }

            const result = await DeviceModel.updateOne(
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

            await DeviceModel.deleteMany({deviceId: {$ne: deviceId}})

            const count = await DeviceModel.countDocuments({})

            return count === 1;

        } catch (e) {
            throw new Error('Can not delete devices')
        }
    },

    async deleteDeviceByDeviceId (deviceId: string) {
        try {
            const result = await DeviceModel.deleteOne({deviceId: deviceId})

            return result.deletedCount === 1
        } catch (e) {
            throw new Error('Can not delete device by deviceId')
        }
    }
}