import {app} from "../../src/app";
import request = require('supertest')
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "../utils/createUserManager";
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
        const {createdUser} = await createUserManager.createUser(data, 201)

        const loginData = {
            loginOrEmail: "Dmytro",
            password: "a wanna go home",
        }

        const responseToken = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(200)

        await request(app)
            .get('/api/security/devices')
            .expect(200)

    })

})