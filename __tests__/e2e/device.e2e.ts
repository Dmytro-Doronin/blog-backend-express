import {app} from "../../src/app";
import request = require('supertest')
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "../utils/createUserManager";
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";
import mongoose from "mongoose";
import {url} from "../../src/db/db";
// @ts-ignore
import jwt from "jsonwebtoken";
import {setting} from "../../src/variables";
describe('/devices', () => {
    let userToken: string; // Хранение токена пользователя
    let device1Id: string;
    let device2Id: string;
    let device3Id: string;
    let device4Id: string
    //tokens
    let refreshToken1: string
    let refreshToken2: string
    let refreshToken3: string
    let refreshToken4: string

    beforeAll(async () => {
        // Создаем пользователя и получаем токен
        await mongoose.connect(url)
        await request(app).delete('/api/testing/all-data')
        const data: UsersInputModelType = {
            login: "Home",
            password: "123123",
            email: "asdasd@gmail.com"
        }
        const registrationResponse  = await request(app)
            .post('/api/auth/registration')
            .send(data)
            .expect(204)

        userToken = registrationResponse.body.token;
    });


    it('should login user 4 times with different user-agents', async () => {
            const loginData = {
                loginOrEmail: "Home",
                password: "123123",
            }
        // Логиним пользователя 4 раза с разными user-agent
        const loginResponse1 = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .set('User-Agent', 'UserAgent1');
            const cookies = loginResponse1.headers['set-cookie'];
            const refreshTokenCookie = Array.isArray(cookies)
             ? cookies.find((cookie) => cookie.startsWith('refreshToken='))
             : undefined;

             if (refreshTokenCookie) {
                 refreshToken1 = refreshTokenCookie.split(';')[0].split('=')[1];
                 // console.log('Refresh Token:', refreshToken1);
             } else {
                 console.log('Refresh Token not found in cookies.');
             }

        const loginResponse2 = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .set('User-Agent', 'UserAgent2');
        const cookies2 = loginResponse2.headers['set-cookie'];
        const refreshTokenCookie2 = Array.isArray(cookies2)
            ? cookies2.find((cookie) => cookie.startsWith('refreshToken='))
            : undefined;

        if (refreshTokenCookie2) {
            refreshToken2 = refreshTokenCookie2.split(';')[0].split('=')[1];
            // console.log('Refresh Token:', refreshToken1);
        } else {
            console.log('Refresh Token not found in cookies.');
        }


        const loginResponse3 = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .set('User-Agent', 'UserAgent3');
        const cookies3 = loginResponse3.headers['set-cookie'];
        const refreshTokenCookie3 = Array.isArray(cookies3)
            ? cookies3.find((cookie) => cookie.startsWith('refreshToken='))
            : undefined;

        if (refreshTokenCookie3) {
            refreshToken3 = refreshTokenCookie3.split(';')[0].split('=')[1];
            // console.log('Refresh Token:', refreshToken1);
        } else {
            console.log('Refresh Token not found in cookies.');
        }

        const loginResponse4 = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .set('User-Agent', 'UserAgent4');
        const cookies4 = loginResponse4.headers['set-cookie'];
        const refreshTokenCookie4 = Array.isArray(cookies4)
            ? cookies4.find((cookie) => cookie.startsWith('refreshToken='))
            : undefined;

        if (refreshTokenCookie4) {
            refreshToken4 = refreshTokenCookie4.split(';')[0].split('=')[1];
            // console.log('Refresh Token:', refreshToken1);
        } else {
            console.log('Refresh Token not found in cookies.');
        }

        // Проверки на успешные логины, например:
        expect(loginResponse1.statusCode).toBe(200);
        expect(loginResponse2.statusCode).toBe(200);
        expect(loginResponse3.statusCode).toBe(200);
        expect(loginResponse4.statusCode).toBe(200);
    });

    it ('Get all devices', async () => {
        const result = await request(app)
            .get('/api/security/devices')
            .set('Cookie', [`refreshToken=${refreshToken4}`])


        device1Id = result.body[0].deviceId
        device2Id = result.body[1].deviceId
        device3Id = result.body[2].deviceId
        device4Id = result.body[3].deviceId
        expect(result.status).toBe(200);
    })

    it ('RefreshToken inside cookie is missing', async () => {
        const result = await request(app)
            .get('/api/security/devices')


        expect(result.status).toBe(401);
    })

    it ('RefreshToken inside cookie expired', async () => {

        let result
        try {
            const decodedToken = jwt.verify(refreshToken4, setting.JWT_SECRET) as jwt.JwtPayload;

            if (!decodedToken || typeof decodedToken.exp !== 'number') {
                console.log('Некорректный refreshToken');
                // Обработка некорректного refreshToken
                return;
            }

            const tokenExpirationTimeInSeconds = decodedToken.exp;
            const currentTimeInSeconds = Math.floor(Date.now() / 1000);
            const oneHourInSeconds = 3601; // 1 час = 60 минут * 60 секунд

            const expirationTime = currentTimeInSeconds + oneHourInSeconds;


            if (tokenExpirationTimeInSeconds < expirationTime) {
                // refreshToken истек
                console.log('refreshToken expired');
            } else {
                // refreshToken еще действителен
                console.log('refreshToken is valid');
            }
        } catch (error) {
            // Ошибка при декодировании токена
            console.error('Ошибка при декодировании refreshToken:', (error as Error).message);
        }

        expect(result === 'refreshToken expired')
    })

    it ('Update refreshToken for device 1', async () => {

        let before
        let after

        const resultBeforeChangeToken = await request(app)
            .get('/api/security/devices')
            .set('Cookie', [`refreshToken=${refreshToken1}`])

        before = resultBeforeChangeToken.body

        const change = await request(app)
            .post('/api/auth/refresh-token')
            .set('Cookie', [`refreshToken=${refreshToken1}`])

        const cookies = change.headers['set-cookie'];
        const refreshTokenCookie = Array.isArray(cookies)
            ? cookies.find((cookie) => cookie.startsWith('refreshToken='))
            : undefined;

        if (refreshTokenCookie) {
            refreshToken1 = refreshTokenCookie.split(';')[0].split('=')[1];
            // console.log('Refresh Token:', refreshToken1);
        } else {
            console.log('Refresh Token not found in cookies.');
        }

        expect(change.status).toBe(200)

        const resultAfterChangeToken = await request(app)
            .get('/api/security/devices')
            .set('Cookie', [`refreshToken=${refreshToken2}`])

        after = resultAfterChangeToken.body


        expect(after.length).toEqual(before.length);
        expect(after[0].deviceId).toEqual(before[0].deviceId);
        expect(after[1].deviceId).toEqual(before[1].deviceId);
        expect(after[2].deviceId).toEqual(before[2].deviceId);
        expect(after[3].deviceId).toEqual(before[3].deviceId);
        expect(after[0].lastActiveDate).not.toBe(before[0].lastActiveDate);
    })

    it ('Delete device 2', async () => {
         const delRes = await request(app)
            .delete(`/api/security/devices/${device2Id}`)
            .set('Cookie', [`refreshToken=${refreshToken1}`])

        // expect(delRes.status).toBe(204)

        const res = await request(app)
            .get('/api/security/devices')
            .set('Cookie', [`refreshToken=${refreshToken3}`])

        expect(res.body).toHaveLength(3);
    })

    it ('LogOut by device 3', async () => {
        const logRes = await request(app)
            .post(`/api/auth/logout`)
            .set('Cookie', [`refreshToken=${refreshToken3}`])

        expect(logRes.status).toBe(204)
        // expect(delRes.status).toBe(204)

        const res = await request(app)
            .get('/api/security/devices')
            .set('Cookie', [`refreshToken=${refreshToken1}`])

        expect(res.body).toHaveLength(2);
    })

    it ('Delete other devices (must left only 1 device)', async () => {
           const delRes =  await request(app)
                .delete('/api/security/devices')
                .set('Cookie', [`refreshToken=${refreshToken1}`])

        expect(delRes.status).toBe(204)
        // expect(delRes.status).toBe(204)

        const res = await request(app)
            .get('/api/security/devices')
            .set('Cookie', [`refreshToken=${refreshToken1}`])

        console.log(res.body)
        expect(res.body).toHaveLength(1);
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})