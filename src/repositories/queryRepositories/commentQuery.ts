import {commentMapper} from "../../utils/mapper";
import {CommentModel} from "../../db/schemes";

export const commentQuery = {
    async getCommentById (id: string) {

        try {
            const result = await CommentModel.findOne({id: id}).lean()

            if (!result) {
                return null
            }

            return commentMapper(result)

        } catch (e) {
            throw new Error('Comment was not found')
        }

    }
}