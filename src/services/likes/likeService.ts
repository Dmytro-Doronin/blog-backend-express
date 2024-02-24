import {likeMutation} from "../../repositories/mutationRepositories/likeMutation";
import {likeStatusType, LikesType} from "../../types/commonBlogTypeAndPosts.types";
import {CommentMutation} from "../../repositories/mutationRepositories/commentMutation";
import {userMutation} from "../../repositories/mutationRepositories/userMutation";
const { v4: uuidv4 } = require('uuid');

const commentMutation = new CommentMutation()

export const likeService = {

    async createLike(commentId: string, likeStatus: likeStatusType, userId: string, target: string) {

        const user = await userMutation.getUserById(userId)

        if (!user) {
            return null
        }

        const liseData: LikesType = {
            id: uuidv4(),
            userId,
            login: user.accountData.login,
            targetId: commentId,
            target,
            addedAt: (new Date().toISOString()),
            type: likeStatus
        }
        return await likeMutation.createLike(liseData)

    },

    async changeLikeStatus (commentId: string, likeStatus: likeStatusType, userId: string, target: string) {
        return await likeMutation.updateLike(userId, commentId, likeStatus, target)
    }
}