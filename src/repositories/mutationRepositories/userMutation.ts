import {BlogViewModelType, userDBType} from "../../types/commonBlogTypeAndPosts.types";
import {blogMapper, userMapper} from "../../utils/mapper";
import {UserModel} from "../../db/schemes";


export const userMutation = {
    async createUser (newUser : userDBType) {
        try {
            await UserModel.create(newUser)
            const findUser = await UserModel.findOne({id: newUser.id}).lean()

            if (!findUser) {
                return null
            }

            return findUser
        } catch (e) {
            console.log(e)
            throw new Error('User was not created')
        }
    },

    async deleteUserByIdInDb (id: string) {

        try {
            const res = await UserModel.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
            return null

        } catch (e) {
            throw new Error('User was not deleted')
        }
    }
}