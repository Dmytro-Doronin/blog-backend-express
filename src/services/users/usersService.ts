import bcrypt from 'bcryptjs';
import {userDBType, UsersInputModelType, UserViewModel} from "../../types/commonBlogTypeAndPosts.types";
import {userMutation} from "../../repositories/mutationRepositories/userMutation";
import {userQuery} from "../../repositories/queryRepositories/userQuery";
import {add} from 'date-fns'
import {userMapper} from "../../utils/mapper";
const { v4: uuidv4 } = require('uuid');
export const usersService = {
    async createUser ({email, password, login} : UsersInputModelType) {
        const passwordSalt =  await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const newUser: userDBType = {
            id: uuidv4(),
            accountData: {
                login: login,
                email,
                passwordHash,
                passwordSalt,
                createdAt: new Date().toISOString()
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date, {minutes: 3}),
                isConfirmed: false
            },
            passwordRecovery: {
                passwordRecoveryCode:  uuidv4(),
                expirationDate: add(new Date, {minutes: 3}),
            }

        }
        const user = await userMutation.createUser(newUser)

        if (!user) {
            return null
        }
        return userMapper(user)
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await userQuery.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false
        const passwordHash = await this._generateHash(password, user.accountData.passwordSalt)

        if (user.accountData.passwordHash === passwordHash) {
            return userMapper(user)
        } else {
            return false
        }
    },


    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    },

    async deleteUserById (id: string)  {
        return await userMutation.deleteUserByIdInDb(id)
    }
}