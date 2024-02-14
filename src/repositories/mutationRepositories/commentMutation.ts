import {CommentInputModelType, commentsDBType} from "../../types/commonBlogTypeAndPosts.types";
import {commentQuery} from "../queryRepositories/commentQuery";
import {commentMapper} from "../../utils/mapper";
import {CommentModel} from "../../db/schemes";

export const commentMutation = {
    async createCommentForPostInDb (newComments: commentsDBType) {

        try {
            await CommentModel.create(newComments)

            const comment = await CommentModel.findOne({id: newComments.id}).lean()

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
            await CommentModel.updateOne(
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
        await CommentModel.deleteOne({id: id})
    },

    async changeLikeStatus (commentId: string, likeStatus: string, userId: string) {
        try {
            const comment = await CommentModel.findOne({id: commentId}).lean()

            if (!comment) {
                return null
            }

            const hasLiked = comment.likesInfo.likedBy.includes(userId)
            const hasDislike = comment.likesInfo.dislikedBy.includes(userId)

            if (likeStatus == "Like" && !hasLiked) {
                comment.likesInfo.likesCount += 1
                comment.likesInfo.likedBy.push(userId)
            } else if (likeStatus == "Dislike" && !hasDislike) {
                comment.likesInfo.dislikesCount += 1
                comment.likesInfo.dislikedBy.push(userId)
            } else if (likeStatus == "None" && hasLiked) {
                comment.likesInfo.likesCount -= 1
                comment.likesInfo.likedBy.filter(item => item !== userId)
            } else {
                comment.likesInfo.dislikesCount -= 1
                comment.likesInfo.dislikedBy.filter(item => item !== userId)
            }

           const result =  await CommentModel.updateOne({ id: commentId }, { $set: { likesInfo: comment.likesInfo } });

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Can not change status')
        }

    }
}