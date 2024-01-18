import {BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {dbBlogCollections, dbUsersCollections} from "../../db/dbCollections";
import {blogMapper} from "../../utils/maper";

export const authQuery = {
    async getUserByConfirmationCode (code: string)  {

        try {
            const user = await dbUsersCollections.findOne({"emailConfirmation.confirmationCode": code})
            if (!user) {
                return null
            }
            return user
        } catch (e) {
            throw new Error('User was not found')
        }

    },
}