import bcrypt from 'bcryptjs';
import {userDBType, UsersInputModelType, UserViewModel} from "../../types/commonBlogTypeAndPosts.types";
import {userMutation} from "../../repositories/mutationRepositories/userMutation";
import {userQuery} from "../../repositories/queryRepositories/userQuery";
const { v4: uuidv4 } = require('uuid');
export const usersService = {
    async createUser ({email, password, login} : UsersInputModelType) {
        const passwordSalt =  await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: userDBType = {
            id: uuidv4(),
            login: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        return userMutation.createUser(newUser)
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await userQuery.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        const passwordHash = await this._generateHash(password, user.passwordSalt)

        return user.passwordHash === passwordHash
    },

    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },

    async deleteUserById (id: string)  {
        return await userMutation.deleteUserByIdInDb(id)
    }
}