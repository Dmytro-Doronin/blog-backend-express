import {emailAdapter} from "../../adapters/emailAdapter";


export const mailManager = {
    async sendConfirmationMail (subject: string, email: string, code: string) {

        const htmlMessage = ` <h1>Thank for your registration dear ${subject}</h1>
                        <p>To finish registration please follow the link below:
                                <a href='https://somesite.com/confirm-email?${code}'>complete registration</a>
                                ${code}
                        </p>`

        await emailAdapter.send(subject, email, htmlMessage)
    }
}