import {dbCommentsCollections} from "../../db/dbCollections";
import {commentsDBType} from "../../types/commonBlogTypeAndPosts.types";
import {commentQuery} from "../queryRepositories/commentQuery";
import {commentMapper} from "../../utils/maper";

export const commentMutation = {
    async createCommentForPostInDb (newComments: commentsDBType) {

        try {
            await dbCommentsCollections.insertOne(newComments)

            const comment = await dbCommentsCollections.findOne({id: newComments.id})

            if (!comment) {
                return null
            }

            return commentMapper(comment)

        } catch (e) {
            throw new Error('Comment was not created')
        }

    }
}