import {BlackListModel} from "../../db/schemes";


export const blackListMutation = {

    async putTokenInBlackList (token: string) {
        try {
            await BlackListModel.create({token: token})

            const tokenInBlacklist = await BlackListModel.findOne({token: token}).lean()

            if (!tokenInBlacklist) {
                return null
            }
            return tokenInBlacklist
        } catch (e) {
            throw new Error('Token was not get')
        }
    }

}