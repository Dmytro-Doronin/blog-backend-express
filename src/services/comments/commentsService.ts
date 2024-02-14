import {postQuery} from "../../repositories/queryRepositories/postQuery";
import {CommentInputModelType, commentsDBType} from "../../types/commonBlogTypeAndPosts.types";
import {commentQuery} from "../../repositories/queryRepositories/commentQuery";
import {commentMutation} from "../../repositories/mutationRepositories/commentMutation";
const { v4: uuidv4 } = require('uuid');
export const commentsService = {
    async createComment (postId: string, content: string, userId: string, userLogin: string) {

        const post = await postQuery.getPostByIdFromDb(postId)

        if (!post) {
            return null
        }

        const newComments: commentsDBType = {
            id: uuidv4(),
            postId,
            content,
            commentatorInfo: {
                userId,
                userLogin
            },
            createdAt: (new Date().toISOString()),
            likesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: "None",
                likedBy: [],
                dislikedBy: []
            },
        }

        return commentMutation.createCommentForPostInDb(newComments)

    },

    async changeComment (id: string, content: string) {
        return await commentMutation.changeCommentByIdInDb(id, content)
    },

    async deleteComment(id: string) {
        return await commentMutation.deleteCommentById(id)
    },

    async changeLikeStatus (commentId: string, likeStatus: string, userId: string) {

        return await commentMutation.changeLikeStatus(commentId,likeStatus,userId)
    }
}