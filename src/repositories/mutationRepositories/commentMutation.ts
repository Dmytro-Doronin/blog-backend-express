import { dbCommentsCollections} from "../../db/dbCollections";
import {CommentInputModelType, commentsDBType} from "../../types/commonBlogTypeAndPosts.types";
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
    },

    async changeCommentByIdInDb (id: string, newContent: string) {
        try {
            await dbCommentsCollections.updateOne(
                {id: id},
                {
                    $set: {content: newContent}
                }
            )

        } catch (e) {
            throw new Error('Comment was not changed by id')
        }

    },

    async deleteCommentById (id: string) {
        await dbCommentsCollections.deleteOne({id: id})
    }
}