import {dbBlacklistCollections} from "../../db/dbCollections";


export const blackListQuery = {

    async checkTokenInBlackList (token: string) {
        try {
            const tokenInBlacklist = await dbBlacklistCollections.findOne({token: token})

            if (!tokenInBlacklist) {
                return null
            }
            return  tokenInBlacklist
        } catch (e) {
            throw new Error('Token was not get')
        }
    }

}