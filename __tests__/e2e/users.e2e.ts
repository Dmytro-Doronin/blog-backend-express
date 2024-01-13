import {app} from "../../src/app";
import request = require('supertest')
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "../utils/createUserManager";



describe('/users', () => {
    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })

    it ('Should create and add user to the db', async () => {

        const data: UsersInputModelType = {
            login: "Home",
            password: "a wanna go home",
            email: "asdasd@gmail.com"
        }
        await createUserManager.createUser(data, 201)
    })


    it ('Should not create user with incorrect login', async () => {

        const data: UsersInputModelType = {
            login: "HomeHomeHomeHomeHomeHomeHomeHome",
            password: "a wanna go home",
            email: "asdasd@gmail.com"
        }
        const {createResponse} = await createUserManager.createUser(data, 400)

        expect(createResponse.body).toEqual({
            errorsMessages: [
                {
                    message: "Invalid value",
                    field: "login"
                }
            ]
        })
    })

    it ('Should not create user with incorrect password', async () => {

        const data: UsersInputModelType = {
            login: "Home",
            password: "a wanna go home a wanna go home a wanna go home a wanna go home a wanna go home",
            email: "asdasd@gmail.com"
        }
        const {createResponse} = await createUserManager.createUser(data, 400)

        expect(createResponse.body).toEqual({
            errorsMessages: [
                {
                    message: 'The field must not be less then 6 symbols and more then 20 symbols',
                    field: "password"
                }
            ]
        })
    })

    it ('Should not create user with incorrect email', async () => {

        const data: UsersInputModelType = {
            login: "Home",
            password: "a wanna",
            email: ""
        }
        const {createResponse} = await createUserManager.createUser(data, 400)

        expect(createResponse.body).toEqual({
            errorsMessages: [
                {
                    message: "Invalid value",
                    field: "email"
                }
            ]
        })
    })

    it ('Should get all user from db', async () => {

        const data: UsersInputModelType = {
            login: "Home",
            password: "a wanna",
            email: "asdasd@gmail.com"
        }
        const {createdUser} = await createUserManager.createUser(data, 201)

        await request(app)
            .get(`/api/users`)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(200, {
                pagesCount: 1,
                page: 1,
                pageSize: 10,
                totalCount: 1,
                items: [createdUser]
            })
    })

    it ('Should delete user from db', async () => {

        const data: UsersInputModelType = {
            login: "Home",
            password: "a wanna",
            email: "asdasd@gmail.com"
        }
        const {createdUser} = await createUserManager.createUser(data, 201)


        await request(app)
            .delete(`/api/users/${createdUser.id}`)
            .set('Authorization', 'Basic YWRtaW46cXdlcnR5')
            .withCredentials(true)
            .expect(204)
    })

    afterAll(done => {
        done()
    })
})