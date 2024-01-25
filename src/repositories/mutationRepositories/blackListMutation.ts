import {dbBlacklistCollections} from "../../db/dbCollections";


export const blackListMutation = {

    async putTokenInBlackList (token: string) {
        try {
            await dbBlacklistCollections.insertOne({token: token})

            const tokenInBlacklist = await dbBlacklistCollections.findOne({token: token})

            if (!tokenInBlacklist) {
                return null
            }
            return tokenInBlacklist
        } catch (e) {
            throw new Error('Token was not get')
        }
    }

}