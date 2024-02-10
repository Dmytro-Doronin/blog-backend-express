import {BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {blogMapper} from "../../utils/mapper";
import {UserModel} from "../../db/schemes";

export const authQuery = {
    async getUserByConfirmationCode (code: string)  {

        try {
            const user = await UserModel.findOne({"emailConfirmation.confirmationCode": code}).lean()
            if (!user) {
                return null
            }
            return user
        } catch (e) {
            throw new Error('User was not found')
        }

    },
}