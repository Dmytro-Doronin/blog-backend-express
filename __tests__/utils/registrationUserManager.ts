import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {app} from "../../src/app";
import request = require('supertest')

export const registrationUserManager = {
    async registrationUser (data: UsersInputModelType, statusCode = 204) {

        const createResponse = await request(app)
            .post('/api/auth/registration')
            .send(data)
            .expect(statusCode)

        // let createdUser
        //
        // if (statusCode === 201) {
        //     createdUser = createResponse.body
        //
        //     expect(createdUser).toEqual(
        //         {
        //             id: expect.any(String),
        //             login: data.login,
        //             email: data.email,
        //             createdAt: expect.any(String),
        //         }
        //     )
        // }

        return {createResponse}
    }
}