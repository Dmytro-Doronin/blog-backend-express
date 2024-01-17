import nodemailer from "nodemailer";
import * as dotenv from 'dotenv'
dotenv.config()
export const emailAdapter = {
   async send(subject: string ,email: string, message: string) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
                user: process.env.HOST_EMAIL,
                pass: process.env.HOST_EMAIL_PASSWORD,
            },
        })

        const info = await transporter.sendMail({
            from: 'Dmytro <process.env.HOST_EMAIL>', // sender address
            to: email, // list of receivers
            subject: subject, // Subject line
            html: message, // html body
        });

    }
}



