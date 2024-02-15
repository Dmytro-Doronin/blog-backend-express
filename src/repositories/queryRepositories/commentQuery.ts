import {commentMapper} from "../../utils/mapper";
import {CommentModel, LikeModel} from "../../db/schemes";
import {likeStatusType} from "../../types/commonBlogTypeAndPosts.types";


export const commentQuery = {
    async getCommentById (commentId: string, userId: string = '') {

        try {
            const result = await CommentModel.findOne({id: commentId}).lean()

            if (!result) {
                return null
            }

            let status: likeStatusType | undefined
            if (userId) {
                const like = await LikeModel.findOne({targetId: commentId, userId: userId }).lean()
                status = like?.type
            }
            const allLikesAndDislikesForCurrentComment = await LikeModel.find({targetId: commentId}).lean();
            const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
            const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");

            return commentMapper(result, likes.length, dislikes.length, status )

        } catch (e) {
            throw new Error('Comment was not found')
        }

    }
}