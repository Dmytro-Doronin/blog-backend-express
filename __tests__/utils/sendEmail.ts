import {userQuery} from "../../src/repositories/queryRepositories/userQuery";

const sinon = require('sinon');
const nodemailer = require('nodemailer');
export const sendEmail = async (callback: any, data: any, code: number) => {
    const fakeTransporter = {
        sendMail: sinon.fake.resolves({status: 204}),
    };

    sinon.stub(nodemailer, 'createTransport').returns(fakeTransporter);

    await callback(data, code)

    sinon.assert.calledOnce(fakeTransporter.sendMail);
    sinon.restore();
}