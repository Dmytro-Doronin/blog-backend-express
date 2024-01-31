import {jwtService} from "../../application/jwtService";
import {DeviceDBType} from "../../types/commonBlogTypeAndPosts.types";
import {deviceMutation} from "../../repositories/mutationRepositories/deviceMutation";


export const securityDevicesService = {
    async createDevice (token: string, ip: string = 'No ip', title: string = 'No title') {
        const {userId, lastActiveDate, expireDate, deviceId} = await jwtService.verifyToken(token)

        const newDevice: DeviceDBType = {
            deviceId: deviceId,
            userId: userId,
            lastActiveDate: lastActiveDate,
            expireDate: expireDate,
            ip: ip,
            title: title,
        }

        return await deviceMutation.createDevice(newDevice)

    },

    async changeDevicesData (token: string) {
        const {deviceId, lastActiveDate, expireDate} = await jwtService.verifyToken(token)

        return await deviceMutation.changeDeviceDataByDeviceId(deviceId, lastActiveDate, expireDate)
    },

    async deleteAllDeviceExcludeCurrent (deviceId: string) {
        return await deviceMutation.deleteAllDeviceExcludeCurrent(deviceId)
    },

    async deleteDevice (deviceId: string) {
        return await deviceMutation.deleteDeviceByDeviceId(deviceId)
    }
}