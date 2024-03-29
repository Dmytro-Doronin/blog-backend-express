import {userDBType, UsersInputModelType} from "../../types/commonBlogTypeAndPosts.types";
import bcrypt from "bcryptjs";
import {add} from "date-fns";
import {userMutation} from "../../repositories/mutationRepositories/userMutation";
import {userQuery} from "../../repositories/queryRepositories/userQuery";
import {mailManager} from "../../manager/mail/mailManager";
// import {authQuery} from "../../repositories/queryRepositories/authQuery";
import {AuthMutation} from "../../repositories/mutationRepositories/authMutation";
import {inject, injectable} from "inversify";
import {userMapper} from "../../utils/mapper";
const { v4: uuidv4 } = require('uuid');

@injectable()
export class AuthService  {

    constructor(@inject(AuthMutation) protected authMutation: AuthMutation) {}

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
                passwordRecoveryCode: uuidv4(),
                expirationDate: add(new Date, {minutes: 3}),
            }
        }
        const createdUser = await userMutation.createUser(newUser)

        if (!createdUser) {
            return null
        }

        await mailManager.sendConfirmationMail(createdUser.accountData.login, createdUser.accountData.email, createdUser.emailConfirmation.confirmationCode)

        return createdUser
    }

    async checkAuthCredentials(loginOrEmail: string, password: string) {
        const user = await userQuery.findUserByLoginOrEmail(loginOrEmail)

        if (!user) return false

        const passwordHash = await this._generateHash(password, user.accountData.passwordSalt)

        if (user.accountData.passwordHash === passwordHash) {
            return userMapper(user)
        } else {
            return false
        }
    }

    async confirmEmail(code: string) {
        const user = await this.authMutation.getUserByConfirmationCode(code)

        if (!user) {
            return null
        }

        if(user.emailConfirmation.confirmationCode === code && user.emailConfirmation.expirationDate > new Date()) {
            return await this.authMutation.updateConfirmation(user.id)
        }

        return false

    }

    async resendEmail (email: string) {
        const user = await userQuery.findUserByLoginOrEmail(email)

        if (!user) {
            return false
        }

        if (user.emailConfirmation.isConfirmed) {
            return false
        }

        const newCode = {
            code: uuidv4(),
            date: add(new Date, {minutes: 3})
        }

        const updateConfirmation = await this.authMutation.updateConfirmationCode(user.id, newCode.code, newCode.date)
        if (!updateConfirmation) {
            return false
        }
        return await mailManager.sendConfirmationMail(user.accountData.login, user.accountData.email, newCode.code)
    }

    async recoveryPassword (email: string) {
        const user = await userQuery.findUserByLoginOrEmail(email)

        if (!user) {
            return true
        }

        const data = {
            code: uuidv4(),
            date: add(new Date, {minutes: 3})
        }

        const updateRecoveryCode = await this.authMutation.updatePasswordRecoveryCode(user.id, data.code, data.date)

        if (!updateRecoveryCode) {
            return false
        }

        return await mailManager.sendRecoveryPasswordMail(user.accountData.login, user.accountData.email, data.code)
    }

    async newPassword (recoveryCode: string, newPassword: string) {

        const passwordSalt =  await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(newPassword, passwordSalt)

        return await this.authMutation.updatePassword(passwordSalt, passwordHash, recoveryCode)

    }
    async _generateHash(password: string, salt: string) {
        return await bcrypt.hash(password, salt)
    }

    async deleteUserById (id: string)  {
        return await userMutation.deleteUserByIdInDb(id)
    }

}