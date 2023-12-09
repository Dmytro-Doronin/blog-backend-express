import {BlogInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {app} from "../../src/app";
import request = require('supertest')


export const createBlogManager = {

    async createBlog (data: BlogInputModelType, statusCode: number = 201) {

        const createResponse = await request(app)
            .post('/api/blogs')
            .send(data)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(statusCode)

        let createdBlog

        if (statusCode === 201) {
            createdBlog = createResponse.body

            expect(createdBlog).toEqual({
                id: expect.any(String),
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl
            })
        }

        return {createResponse, createdBlog}
    }


}