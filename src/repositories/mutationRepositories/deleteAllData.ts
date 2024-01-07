
import {dbBlogCollections, dbUsersCollections} from "../../db/dbCollections";
import {dbPostCollections} from "../../db/dbCollections";

export const deleteAllDataMutation = {
    async deleteAllDataFromDb () {
        try {
            await dbBlogCollections.deleteMany({})
            await dbPostCollections.deleteMany({})
            await dbUsersCollections.deleteMany({})
        } catch (e) {
            throw new Error('All data was not deleted')
        }

    }
}