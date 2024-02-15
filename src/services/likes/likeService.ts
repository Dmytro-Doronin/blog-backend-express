import {likeMutation} from "../../repositories/mutationRepositories/likeMutation";
import {likeStatusType, LikesType} from "../../types/commonBlogTypeAndPosts.types";
import {commentMutation} from "../../repositories/mutationRepositories/commentMutation";
const { v4: uuidv4 } = require('uuid');

export const likeService = {

    async createLike(commentId: string, likeStatus: likeStatusType, userId: string) {

        const liseData: LikesType = {
            id: uuidv4(),
            userId,
            targetId: commentId,
            type: likeStatus
        }
        return await likeMutation.createLike(liseData)

    },

    async changeLikeStatus (commentId: string, likeStatus: likeStatusType, userId: string) {
        return await likeMutation.updateLike(userId, commentId, likeStatus)
    }
}