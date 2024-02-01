import {app} from "../../src/app";
import request = require('supertest')
const sinon = require('sinon');
const nodemailer = require('nodemailer');
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "../utils/createUserManager";
import {registrationUserManager} from "../utils/registrationUserManager";
import {userQuery} from "../../src/repositories/queryRepositories/userQuery";
import {sendEmailAndGetUserManager} from "../utils/sendEmailAndGetUserManager";
import {sendEmail} from "../utils/sendEmail";



// describe('/auth', () => {
//
//     beforeEach(async () => {
//         await request(app).delete('/api/testing/all-data')
//     })
//
//
//     it ('user should be registered and send email', async () => {
//
//         await sendEmailAndGetUserManager()
//     })
//
//     it ('code send and and user was confirmed', async () => {
//
//         const createdUser = await sendEmailAndGetUserManager()
//
//
//         const code = {
//             code: createdUser!.emailConfirmation.confirmationCode
//         }
//          await request(app)
//             .post('/api/auth/registration-confirmation')
//             .send(code)
//             .expect(204)
//
//         const confirmedUser = await userQuery.findUserByLoginOrEmail(createdUser!.accountData.login)
//
//         expect(confirmedUser!.emailConfirmation.isConfirmed).toEqual(true)
//     })
//
//     it ('email resending', async () => {
//
//         const createdUser = await sendEmailAndGetUserManager()
//
//         const userEmail = {
//             email: createdUser!.accountData.email
//         }
//
//         async function resendEmail (data: {email: string}, code = 204) {
//             await request(app)
//                 .post('/api/auth/registration-email-resending')
//                 .send(data)
//                 .expect(code)
//         }
//
//         await sendEmail(resendEmail, userEmail, 204)
//
//     })
//
//
// })
