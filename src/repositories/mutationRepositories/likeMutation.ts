import {BlogModel, LikeModel} from "../../db/schemes";
import {likeStatusType, LikesType} from "../../types/commonBlogTypeAndPosts.types";

export const likeMutation = {
    async getLike (userId: string, commentId: string) {
        try {
            return await LikeModel.findOne({userId: userId ,targetId: commentId}).lean()

        } catch (e) {
            throw new Error('Can not get like or dislike')
        }
    },

    async getLikesForTarget (userId: string, commentId: string) {
        try {
            return await LikeModel.find({userId: userId ,targetId: commentId}).lean()

        } catch (e) {
            throw new Error('Can not get like or dislike')
        }
    },

    async getAllLikesAndDislikesForComment(commentId: string) {
        try {
            return await LikeModel.find({targetId: commentId}).lean()

        } catch (e) {
            throw new Error('Can not get likes or dislikes for comment')
        }
    },

    async createLike (likeData: LikesType) {
        try {
            await LikeModel.create(likeData)
            const result = await LikeModel.findOne({id: likeData.id}).lean()

            if (!result) {
                return null
            }

            return result

        } catch (e) {
            throw new Error('Can not get like or dislike')
        }
    },

    async updateLike(userId: string ,commentId: string, likeStatus: likeStatusType, target: string ) {

        try {
            const result = await LikeModel.updateOne(
                {userId, targetId: commentId, target},
                {
                    $set: {type: likeStatus, addedAt: (new Date().toISOString())}
                }
            )
            return result.modifiedCount === 1;



        } catch (e) {
            throw new Error('Can not get like ir dislike')
        }
    }
}