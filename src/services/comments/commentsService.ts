import {PostQuery} from "../../repositories/queryRepositories/postQuery";
import {commentsDBType,} from "../../types/commonBlogTypeAndPosts.types";
import {CommentMutation} from "../../repositories/mutationRepositories/commentMutation";
import {commentMapper} from "../../utils/mapper";
import {inject, injectable} from "inversify";
import {PostMutation} from "../../repositories/mutationRepositories/postMutation";
const { v4: uuidv4 } = require('uuid');

const postQuery = new PostQuery()

@injectable()
export class CommentsService {

    constructor(@inject(CommentMutation) protected commentMutation: CommentMutation) {}

    async createComment (postId: string, content: string, userId: string, userLogin: string) {

        const post = await postQuery.getPostByIdFromDb(postId, userId)

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

        const comment = await this.commentMutation.createCommentForPostInDb(newComments)

        if (!comment) {
            return null
        }

        return commentMapper(comment)

    }

    async changeComment (id: string, content: string) {

        return await this.commentMutation.changeCommentByIdInDb(id, content)
    }

    async deleteComment(id: string) {
        return await this.commentMutation.deleteCommentById(id)
    }

}