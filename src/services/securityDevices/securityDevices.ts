import {jwtService} from "../../application/jwtService";
import {DeviceDBType} from "../../types/commonBlogTypeAndPosts.types";


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


    }

}