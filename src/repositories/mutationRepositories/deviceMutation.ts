import {DeviceDBType} from "../../types/commonBlogTypeAndPosts.types";
import {dbDeviceCollections} from "../../db/dbCollections";

export const deviceMutation = {
    async createDevice (device: DeviceDBType) {
        try {
           const result =  await dbDeviceCollections.insertOne(device)
            
        } catch (e) {
            throw new Error('Device was not created')
        }
    }
}