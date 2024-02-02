import {app} from "../../src/app";
import request = require('supertest')
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";

describe('/blogs', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })

    it ('Should 429 ', async () => {

        await sendEmailAndGetUserManager()

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
        }

        const loginData = {
            loginOrEmail: "HomeB",
            password: "123123",
        }
        const response = await request(app)
            .post('/api/auth/login')
            .set('User-Agent', 'Mozilla/5.0')
            .send(loginData)

        // Проверка, что ответ имеет статус 429
        expect(response.status).toBe(429);


        await new Promise(resolve => setTimeout(resolve, 11000));

        const loginData2 = {
            loginOrEmail: "HomeB",
            password: "123123",
        }
        // Отправляем запрос после ожидания, который должен вернуть 401
        const response2 = await request(app)
            .post('/api/auth/login')
            .set('User-Agent', 'Mozilla/5.0')
            .send(loginData2)

        // Проверяем, что статус второго ответа - 401
        expect(response2.status).toBe(401);
    }, 15000)

})