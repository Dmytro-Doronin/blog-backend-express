import {BlogInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {app} from "../../src/app";
import request = require('supertest')
import {routePath} from "../../src/variables";


export const createBlogManager = {

    async createBlog (data: BlogInputModelType,statusCode: number = 201, path = routePath.BLOGS ) {

        const createResponse = await request(app)
            .post(path)
            .send(data)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(statusCode)

        let createdBlog

        if (statusCode === 201) {
            createdBlog = createResponse.body

            expect(createdBlog).toEqual(
                    {
                        id: expect.any(String),
                        name: data.name,
                        description: data.description,
                        websiteUrl: data.websiteUrl,
                        createdAt: expect.any(String),
                        isMembership: expect.any(Boolean),
                    }
            )
        }

        return {createResponse, createdBlog}
    }
}