import {userQuery} from "../../src/repositories/queryRepositories/userQuery";

const sinon = require('sinon');
const nodemailer = require('nodemailer');
import {UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {registrationUserManager} from "./registrationUserManager";

export const sendEmailAndGetUserManager = async () => {
    const fakeTransporter = {
        sendMail: sinon.fake.resolves({status: 204}),
    };

    sinon.stub(nodemailer, 'createTransport').returns(fakeTransporter);

    const data: UsersInputModelType = {
        login: "Home",
        password: "123123",
        email: "asdasd@gmail.com"
    }

    await registrationUserManager.registrationUser(data)


    sinon.assert.calledOnce(fakeTransporter.sendMail);
    sinon.restore();

    return await userQuery.findUserByLoginOrEmail(data.login)

}