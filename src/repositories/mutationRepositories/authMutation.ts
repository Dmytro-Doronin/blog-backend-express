import {dbUsersCollections} from "../../db/dbCollections";

export const authMutation = {
    async updateConfirmation (id: string) {
        const result = await dbUsersCollections.updateOne({id}, {$set: {"emailConfirmation.isConfirmed": true}})

        return result.modifiedCount === 1
    },

    async updateConfirmationCode (id: string, code: string, date: Date) {
        try {
            const result = await dbUsersCollections.updateOne(
                {id},
                {$set: {
                        "emailConfirmation.confirmationCode": code,
                        "emailConfirmation.expirationDate": date
                    }})

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Confirmation was not changed')
        }

    }
}