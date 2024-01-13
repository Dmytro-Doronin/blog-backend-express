import {BlogInputModelType, UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {routePath} from "../../src/variables";
import {app} from "../../src/app";
import request = require('supertest')

export const createUserManager = {

    async createUser (data: UsersInputModelType, statusCode = 201) {

        const createResponse = await request(app)
            .post('/api/users')
            .send(data)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(statusCode)

        let createdUser

        if (statusCode === 201) {
            createdUser = createResponse.body

            expect(createdUser).toEqual(
                {
                    id: expect.any(String),
                    login: data.login,
                    email: data.email,
                    createdAt: expect.any(String),
                }
            )
        }

        return {createResponse, createdUser}
    }
}