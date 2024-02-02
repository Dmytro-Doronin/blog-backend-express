import {app} from "../../src/app";
import request = require('supertest')
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";

describe('/blogs', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })

    it ('Should 429 /auth/registration', async () => {

        // await sendEmailAndGetUserManager()
        const registrationData = {
            login: "Dima",
            password: "string",
            email: "asdasd@sdf.com"
        }
        for (let i = 0; i <= 5; i++) {

            let refreshToken1
            const device1 = await request(app)
                .post('/api/auth/registration')
                .set('User-Agent', 'Mozilla/5.0')
                .send(registrationData)
        }

        const response = await request(app)
            .post('/api/auth/registration')
            .set('User-Agent', 'Mozilla/5.0')
            .send(registrationData)

        // Проверка, что ответ имеет статус 429
        expect(response.status).toBe(429);


        await new Promise(resolve => setTimeout(resolve, 10000));

        // Отправляем запрос после ожидания, который должен вернуть 401
        const response2 = await request(app)
            .post('/api/auth/registration')
            .set('User-Agent', 'Mozilla/5.0')
            .send(registrationData)

        // Проверяем, что статус второго ответа - 401
        expect(response2.status).toBe(204);
    }, 15000)


    it ('Should 429 /auth/login', async () => {

        await sendEmailAndGetUserManager()
        const loginData = {
            loginOrEmail: "HomeB",
            password: "123123",
        }
        for (let i = 0; i <= 5; i++) {

            let refreshToken1
            const device1 = await request(app)
                .post('/api/auth/login')
                .set('User-Agent', 'Mozilla/5.0')
                .send(loginData)
        }

        const response = await request(app)
            .post('/api/auth/login')
            .set('User-Agent', 'Mozilla/5.0')
            .send(loginData)

        // Проверка, что ответ имеет статус 429
        expect(response.status).toBe(429);


        await new Promise(resolve => setTimeout(resolve, 10000));

        // Отправляем запрос после ожидания, который должен вернуть 401
        const response2 = await request(app)
            .post('/api/auth/login')
            .set('User-Agent', 'Mozilla/5.0')
            .send(loginData)

        // Проверяем, что статус второго ответа - 401
        expect(response2.status).toBe(401);
    }, 15000)

    it ('Should /auth/registration-email-resending 204 ', async () => {

        await sendEmailAndGetUserManager()
        const resendData = {
            email: "asdasd@gmail.com",
        }
        for (let i = 0; i <= 5; i++) {
            const device1 = await request(app)
                .post('/api/auth/registration-email-resending')
                .set('User-Agent', 'Mozilla/5.0')
                .send(resendData)
        }

        const response = await request(app)
            .post('/api/auth/registration-email-resending')
            .set('User-Agent', 'Mozilla/5.0')
            .send(resendData)

        // Проверка, что ответ имеет статус 429
        expect(response.status).toBe(429);


        await new Promise(resolve => setTimeout(resolve, 10000));


        // Отправляем запрос после ожидания, который должен вернуть 401
        const response2 = await request(app)
            .post('/api/auth/registration-email-resending')
            .set('User-Agent', 'Mozilla/5.0')
            .send(resendData)

        // Проверяем, что статус второго ответа - 204
        expect(response2.status).toBe(204);
    }, 20000)

    it ('Should /auth/registration-confirmation 400 ', async () => {

        await sendEmailAndGetUserManager()
        const resendData = {
            code: "qasdasdasd",
        }
        for (let i = 0; i <= 5; i++) {
            const device1 = await request(app)
                .post('/api/auth/registration-confirmation')
                .set('User-Agent', 'Mozilla/5.0')
                .send(resendData)
        }

        const response = await request(app)
            .post('/api/auth/registration-confirmation')
            .set('User-Agent', 'Mozilla/5.0')
            .send(resendData)

        // Проверка, что ответ имеет статус 429
        expect(response.status).toBe(429);


        await new Promise(resolve => setTimeout(resolve, 10000));


        // Отправляем запрос после ожидания, который должен вернуть 401
        const response2 = await request(app)
            .post('/api/auth/auth/registration-confirmation')
            .set('User-Agent', 'Mozilla/5.0')
            .send(resendData)

        // Проверяем, что статус второго ответа - 204
        expect(response2.status).toBe(404);
    }, 20000)

})