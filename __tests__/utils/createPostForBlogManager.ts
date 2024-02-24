import {BlogInputModelType, BlogViewModelType, PostInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {app} from "../../src/app";
import request = require('supertest')
import {routePath} from "../../src/variables";


export const createPostForBlogManager = {

    async createPostForBlog (data: PostInputModelType, blog: BlogViewModelType, statusCode: number = 201) {

        const createResponse = await request(app)
            .post(`/api/blogs/${blog.id}/posts`)
            .send(data)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(statusCode)

        let createdPostForBlog

        if (statusCode === 201) {
            createdPostForBlog = createResponse.body

            expect(createdPostForBlog).toEqual(
                {
                    id: expect.any(String),
                    title: data.title,
                    shortDescription: data.shortDescription,
                    content: data.content,
                    blogId: blog.id,
                    createdAt: expect.any(String),
                    blogName: expect.any(String),
                    extendedLikesInfo: {
                        dislikesCount: 0,
                        likesCount: 0,
                        myStatus: "None",
                        newestLikes: [],
                    },
                }
            )
        }

        return {createResponse, createdPostForBlog}
    }
}