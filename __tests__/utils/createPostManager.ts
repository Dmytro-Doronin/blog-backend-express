import {PostInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {app} from "../../src/app";
import request = require('supertest')

export const createPostManager = {

    async createPost (data: PostInputModelType, statusCode: number = 201) {

        const createResponse = await request(app)
            .post('/api/posts')
            .send(data)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(statusCode)

        let createdPost
        if (statusCode === 201) {
            createdPost = createResponse.body

            expect(createdPost).toEqual({
                id: expect.any(String),
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId,
                createdAt: expect.any(String),
                blogName: expect.any(String),
                extendedLikesInfo: {
                    dislikesCount: expect.any(Number),
                    likesCount: expect.any(Number),
                    myStatus: "None",
                    newestLikes: [],
                }
            })
        }

        return {createResponse, createdPost}
    }
}