
import {dbBlogCollections} from "./dbCollections";
import {dbPostCollections} from "./dbCollections";

export const deleteAllDataUtil = {
    async deleteAllData () {

        try {
            await dbBlogCollections.deleteMany({})
            await dbPostCollections.deleteMany({})
        } catch (e) {
            throw new Error('All data was not deleted')
        }

    }
}