import {dbCommentsCollections} from "../../db/dbCollections";
import {commentMapper} from "../../utils/mapper";

export const commentQuery = {
    async getCommentById (id: string) {

        try {
            const result = await dbCommentsCollections.findOne({id: id})

            if (!result) {
                return null
            }

            return commentMapper(result)

        } catch (e) {
            throw new Error('Comment was not found')
        }

    }
}