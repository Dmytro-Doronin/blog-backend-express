import {dbUsersCollections} from "../../db/dbCollections";

export const authMutation = {
    async updateConfirmation (id: string) {
        const result = await dbUsersCollections.updateOne({id}, {$set: {"emailConfirmation.isConfirmed": true}})

        return result.modifiedCount === 1
    }
}