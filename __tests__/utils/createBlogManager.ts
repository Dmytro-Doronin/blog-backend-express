import {BlogInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {app} from "../../src/app";
import request = require('supertest')
import any = jasmine.any;

export const createBlogManager = {

    async createBlog (data: BlogInputModelType, statusCode: number = 201) {

        const createResponse = await request(app)
            .post('/api/blogs')
            .send(data)
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