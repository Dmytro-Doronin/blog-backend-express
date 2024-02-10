import {BlackListModel} from "../../db/schemes";


export const blackListQuery = {

    async checkTokenInBlackList (token: string) {
        try {
            const tokenInBlacklist = await BlackListModel.findOne({token: token}).lean()

            if (!tokenInBlacklist) {
                return null
            }
            return  tokenInBlacklist
        } catch (e) {
            throw new Error('Token was not get')
        }
    }

}