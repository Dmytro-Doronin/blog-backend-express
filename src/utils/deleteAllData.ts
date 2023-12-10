
import {dbBlogCollections} from "./blogs/blogRouterUtils";
import {dbPostCollections} from "./posts/postsRouterUtils";

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