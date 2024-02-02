import {app} from "../../src/app";
import request = require('supertest')
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "../utils/createUserManager";
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";
// describe('/comment', () => {
//     let userToken; // Хранение токена пользователя
//     let device1Id;
//     let device2Id;
//     let device3Id;
//     beforeAll(async () => {
//         // Создаем пользователя и получаем токен
//         const data: UsersInputModelType = {
//             login: "Home",
//             password: "123123",
//             email: "asdasd@gmail.com"
//         }
//         const registrationResponse  = await request(app)
//             .post('/api/auth/registration')
//             .send(data)
//             .expect(204)
//
//         userToken = registrationResponse.body.token;
//     });
//
//
//     it('should login user 4 times with different user-agents', async () => {
//             const loginData = {
//                 loginOrEmail: "Home",
//                 password: "123123",
//             }
//         // Логиним пользователя 4 раза с разными user-agent
//         const loginResponse1 = await request(app)
//             .post('/api/auth/login')
//             .send(loginData)
//             .set('User-Agent', 'UserAgent1');
//
//         const loginResponse2 = await request(app)
//             .post('/api/auth/login')
//             .send(loginData)
//             .set('User-Agent', 'UserAgent2');
//
//         const loginResponse3 = await request(app)
//             .post('/api/auth/login')
//             .send(loginData)
//             .set('User-Agent', 'UserAgent3');
//
//         const loginResponse4 = await request(app)
//             .post('/api/auth/login')
//             .send(loginData)
//             .set('User-Agent', 'UserAgent4');
//
//         // Проверки на успешные логины, например:
//         expect(loginResponse1.statusCode).toBe(200);
//         expect(loginResponse2.statusCode).toBe(200);
//         expect(loginResponse3.statusCode).toBe(200);
//         expect(loginResponse4.statusCode).toBe(200);
//     });
//
//
//
//
//     // beforeEach(async () => {
//     //     await request(app).delete('/api/testing/all-data')
//     // }, 10000)
//
//
//
//     // it ('Should return devices', async () => {
//     //
//     //     await sendEmailAndGetUserManager()
//     //
//     //     const loginData = {
//     //         loginOrEmail: "Home",
//     //         password: "123123",
//     //     }
//     //     let refreshToken1
//     //     let refreshToken2
//     //     let refreshToken3
//     //     let refreshToken4
//     //      const device1 = await request(app)
//     //         .post('/api/auth/login')
//     //         .set('User-Agent', 'Mozilla/5.0')
//     //         .send(loginData)
//     //         .expect(200)
//     //          .then((response) => {
//     //              // Извлекаем значение refreshToken из заголовков ответа
//     //              const setCookieHeader = response.headers['set-cookie'];
//     //              const refreshTokenCookie = Array.isArray(setCookieHeader)
//     //                  ? setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='))
//     //                  : undefined;
//     //
//     //              if (refreshTokenCookie) {
//     //                  refreshToken1 = refreshTokenCookie.split(';')[0].split('=')[1];
//     //                  // console.log('Refresh Token:', refreshToken1);
//     //              } else {
//     //                  console.log('Refresh Token not found in cookies.');
//     //              }
//     //          })
//     //
//     //     const device2 = await request(app)
//     //         .post('/api/auth/login')
//     //         .set('User-Agent', 'Mozilla/6.0')
//     //         .send(loginData)
//     //         .expect(200)
//     //         .then((response) => {
//     //             // Извлекаем значение refreshToken из заголовков ответа
//     //             const setCookieHeader = response.headers['set-cookie'];
//     //             const refreshTokenCookie = Array.isArray(setCookieHeader)
//     //                 ? setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='))
//     //                 : undefined;
//     //
//     //             if (refreshTokenCookie) {
//     //                 refreshToken2 = refreshTokenCookie.split(';')[0].split('=')[1];
//     //                 // console.log('Refresh Token:', refreshToken2);
//     //             } else {
//     //                 console.log('Refresh Token not found in cookies.');
//     //             }
//     //         })
//     //
//     //     const device3 = await request(app)
//     //         .post('/api/auth/login')
//     //         .set('User-Agent', 'Mozilla/7.0')
//     //         .send(loginData)
//     //         .expect(200)
//     //         .then((response) => {
//     //             // Извлекаем значение refreshToken из заголовков ответа
//     //             const setCookieHeader = response.headers['set-cookie'];
//     //             const refreshTokenCookie = Array.isArray(setCookieHeader)
//     //                 ? setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='))
//     //                 : undefined;
//     //
//     //             if (refreshTokenCookie) {
//     //                 refreshToken3 = refreshTokenCookie.split(';')[0].split('=')[1];
//     //                 // console.log('Refresh Token:', refreshToken3);
//     //             } else {
//     //                 console.log('Refresh Token not found in cookies.');
//     //             }
//     //         })
//     //
//     //
//     //
//     //     const device4 = await request(app)
//     //         .post('/api/auth/login')
//     //         .set('User-Agent', 'Mozilla/8.0')
//     //         .send(loginData)
//     //         .expect(200)
//     //         .then((response) => {
//     //             // Извлекаем значение refreshToken из заголовков ответа
//     //             const setCookieHeader = response.headers['set-cookie'];
//     //             const refreshTokenCookie = Array.isArray(setCookieHeader)
//     //                 ? setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='))
//     //                 : undefined;
//     //
//     //             if (refreshTokenCookie) {
//     //                 refreshToken4 = refreshTokenCookie.split(';')[0].split('=')[1];
//     //                 // console.log('Refresh Token:', refreshToken4);
//     //             } else {
//     //                 console.log('Refresh Token not found in cookies.');
//     //             }
//     //         })
//     //
//     //     //check first time
//     //     const devices222 = await request(app)
//     //         .get('/api/security/devices')
//     //         .set('Cookie', [`refreshToken=${refreshToken2}`])
//     //         .expect(200)
//     //
//     //     expect(devices222.body).toHaveLength(4)
//     //
//     //     //update token
//     //     await request(app)
//     //         .post('/api/auth/refresh-token')
//     //         .set('Cookie', `refreshToken=${refreshToken1}`)
//     //         .expect(200)
//     //         .then((response) => {
//     //             // Извлекаем значение refreshToken из заголовков ответа
//     //             const setCookieHeader = response.headers['set-cookie'];
//     //             const refreshTokenCookie = Array.isArray(setCookieHeader)
//     //                 ? setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='))
//     //                 : undefined;
//     //
//     //             if (refreshTokenCookie) {
//     //                 refreshToken1 = refreshTokenCookie.split(';')[0].split('=')[1];
//     //             } else {
//     //                 console.log('Refresh Token not found in cookies.');
//     //             }
//     //         })
//     //
//     //     //check second time
//     //     const devices23 = await request(app)
//     //         .get('/api/security/devices')
//     //         .set('Cookie', [`refreshToken=${refreshToken1}`])
//     //         .expect(200)
//     //
//     //     console.log(devices23.body)
//     //     // //
//     //     // const devices1 = await request(app)
//     //     //     .get('/api/security/devices')
//     //     //     .set('Cookie', [`refreshToken=${refreshToken1}`])
//     //     //     .expect(200)
//     //
//     //     // console.log(devices1.body)
//     //     // const deletedDevice2 = devices23.body[1].deviceId
//     //     // await request(app)
//     //     //     .delete(`/api/security/devices/${deletedDevice2}`)
//     //     //     .set('Cookie', `refreshToken=${refreshToken1}`)
//     //     //     .expect(204);
//     //     //
//     //     //
//     //     // const devices233 = await request(app)
//     //     //     .get('/api/security/devices')
//     //     //     .set('Cookie', [`refreshToken=${refreshToken1}`])
//     //     //     .expect(200)
//     //     //
//     //     // console.log(devices233.body)
//     //
//     //
//     // })
//
//
// })