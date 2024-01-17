import {userDBType, UsersInputModelType} from "../../types/commonBlogTypeAndPosts.types";
import bcrypt from "bcryptjs";
import {add} from "date-fns";
import {userMutation} from "../../repositories/mutationRepositories/userMutation";
import {userQuery} from "../../repositories/queryRepositories/userQuery";
const { v4: uuidv4 } = require('uuid');

export const authService = {
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
            }

        }
        const createdUser = await userMutation.createUser(newUser)

        return
    },

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await userQuery.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        const passwordHash = await this._generateHash(password, user.accountData.passwordSalt)

        if (user.accountData.passwordHash === passwordHash) {
            return user
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