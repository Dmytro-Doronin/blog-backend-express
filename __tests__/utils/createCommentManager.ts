import {BlogInputModelType, CommentInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {routePath} from "../../src/variables";
import {app} from "../../src/app";
import request = require('supertest')

export const createCommentManager = {

    async createComment (comment: CommentInputModelType, id: string , jwt: string , statusCode = 201 ) {

        console.log(comment)
        console.log(id)
        console.log(jwt)
        console.log(statusCode)
        const createResponse = await request(app)
            .post(`/api/post/${id}/comments`)
            .send(comment)
            .set('Authorization', `Bearer ${jwt}`)
            .withCredentials(true)
            .expect(statusCode)

        let createdComment

        if (statusCode === 201) {
            createdComment = createResponse.body

            expect(createdComment).toEqual(
                {
                    id:	expect.any(String),
                    content: comment.content,
                    commentatorInfo: {
                        userId: expect.any(String),
                        userLogin: expect.any(String)
                    },
                    createdAt: expect.any(String)
                }
            )
        }

        return {createResponse, createdComment}
    }
}