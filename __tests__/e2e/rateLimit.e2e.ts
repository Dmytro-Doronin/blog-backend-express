import {app} from "../../src/app";
import request = require('supertest')
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";

describe('/blogs', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })

    it ('Should 429 ', async () => {

        await sendEmailAndGetUserManager()

        // const loginData = {
        //     loginOrEmail: "Home",
        //     password: "123123",
        // }
        // let refreshToken1
        // const device1 = await request(app)
        //     .post('/api/auth/login')
        //     .set('User-Agent', 'Mozilla/5.0')
        //     .send(loginData)
        //     .expect(200)

        for (let i = 0; i < 6; i++) {
            const loginData = {
                loginOrEmail: "Home",
                password: "123123",
            }
            let refreshToken1
            const device1 = await request(app)
                .post('/api/auth/login')
                .set('User-Agent', 'Mozilla/5.0')
                .send(loginData)
                .expect(429)
        }
    })

})