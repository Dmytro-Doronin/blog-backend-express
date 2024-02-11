import {UserModel} from "../../db/schemes";


export const authMutation = {
    async updateConfirmation (id: string) {
        const result = await UserModel.updateOne({id}, {$set: {"emailConfirmation.isConfirmed": true}})

        return result.modifiedCount === 1
    },

    async updateConfirmationCode (id: string, code: string, date: Date) {
        try {
            const result = await UserModel.updateOne(
                {id},
                {$set: {
                        "emailConfirmation.confirmationCode": code,
                        "emailConfirmation.expirationDate": date
                    }})

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Confirmation was not changed')
        }
    },
    async updatePasswordRecoveryCode (id: string, code: string, date: Date) {
        try {
            const result = await UserModel.updateOne(
                {id},
                {$set: {
                        "passwordRecovery.passwordRecoveryCode": code,
                        "passwordRecovery.expirationDate": date
                    }})

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Confirmation was not changed')
        }
    },

    async updatePassword (passwordSalt: string, passwordHash: string, recoveryCode: string) {

        try {
            const user = await UserModel.findOne({"passwordRecovery.passwordRecoveryCode": recoveryCode}).lean()

            if (!user) {
                return false
            }

            const result = await UserModel.updateOne(
                {id: user.id},
                {$set: {
                        "accountData.passwordHash": passwordHash,
                        "accountData.passwordSalt": passwordSalt
                    }})

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Confirmation was not changed')
        }
    }
}