import {emailAdapter} from "../../adapters/emailAdapter";


export const mailServices = {
    async sendConfirmationMail (subject: string, email: string, text: string) {

        const htmlMessage = `<b>Hello, ${subject}!</b><br/>Please confirm your email by clicking on the link below:<br/>` +
            `<a href="http://localhost:3002/confirm-email/##token##">Confirm email</a>` +
            `. If it doesn't work, copy and paste the following link in your browser:` +
            `<br/>http://localhost:3000/confirm-email/##token##`

        await emailAdapter.send(subject, email, htmlMessage)
    }
}