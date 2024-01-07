import {BlogViewModelType, userDBType} from "../../types/commonBlogTypeAndPosts.types";
import {dbBlogCollections, dbUsersCollections} from "../../db/dbCollections";
import {blogMapper, userMapper} from "../../utils/maper";
import {userQuery} from "../queryRepositories/userQuery";

export const userMutation = {
    async createUser (newUser : userDBType) {
        try {
            await dbUsersCollections.insertOne(newUser)
            const findUser = await userQuery.findUserById(newUser.id)

            if (!findUser) {
                return null
            }

            return userMapper(findUser)
        } catch (e) {
            throw new Error('Blog was not created')
        }
    },

    async deleteUserByIdInDb (id: string) {

        try {
            const res = await dbUsersCollections.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
            return null

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }
}