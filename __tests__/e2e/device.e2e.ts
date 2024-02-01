import {app} from "../../src/app";
import request = require('supertest')
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "../utils/createUserManager";
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";
describe('/comment', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    }, 10000)

    it ('Should return devices', async () => {

        const data: UsersInputModelType = {
            login: "Home",
            password: "123123",
            email: "asdasd@gmail.com"
        }
        const createdUser = await sendEmailAndGetUserManager()

        const loginData = {
            loginOrEmail: "Home",
            password: "123123",
        }

        const responseToken = await request(app)
            .post('/api/auth/login')
            .set('User-Agent', 'Mozilla/5.0')
            .send(loginData)
            .expect(200)


        await request(app)
            .get('/api/security/devices')
            .expect(200)

    })

})