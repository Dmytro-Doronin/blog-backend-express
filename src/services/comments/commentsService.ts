import {postQuery} from "../../repositories/queryRepositories/postQuery";
import {commentsDBType,} from "../../types/commonBlogTypeAndPosts.types";
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

        }

        return commentMutation.createCommentForPostInDb(newComments)

    },

    async changeComment (id: string, content: string) {

        return await commentMutation.changeCommentByIdInDb(id, content)
    },

    async deleteComment(id: string) {
        return await commentMutation.deleteCommentById(id)
    },

}