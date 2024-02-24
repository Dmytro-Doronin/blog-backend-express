import {CommentInputModelType, commentsDBType} from "../../types/commonBlogTypeAndPosts.types";
import {CommentModel} from "../../db/schemes";
import {injectable} from "inversify";


@injectable()
export class CommentMutation {

    async getCommentById (commentId: string) {
        const comment = await CommentModel.findOne({id: commentId}).lean()

        if (!comment) {
            return null
        }

        return comment
    }

    async createCommentForPostInDb (newComments: commentsDBType) {

        try {
            await CommentModel.create(newComments)

            const comment = await CommentModel.findOne({id: newComments.id}).lean()

            if (!comment) {
                return null
            }

            return comment

        } catch (e) {
            throw new Error('Comment was not created')
        }
    }

    async changeCommentByIdInDb (id: string, newContent: string) {
        try {
            await CommentModel.updateOne(
                {id: id},
                {
                    $set: {content: newContent}
                }
            )

        } catch (e) {
            throw new Error('Comment was not changed by id')
        }

    }

    async deleteCommentById (id: string) {
        await CommentModel.deleteOne({id: id})
    }

}