import bcrypt from 'bcryptjs';
import {userDBType, UsersInputModelType, UserViewModel} from "../../types/commonBlogTypeAndPosts.types";
import {userMutation} from "../../repositories/mutationRepositories/userMutation";
const { v4: uuidv4 } = require('uuid');
export const usersService = {
    async createUser ({email, password, login} : UsersInputModelType) {
        const passwordSalt =  await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: userDBType = {
            id: uuidv4(),
            userName: login,
            email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString()
        }

        return userMutation.createUser(newUser)
    },

    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },

    async deleteUserById (id: string)  {
        return await userMutation.deleteUserByIdInDb(id)
    }
}