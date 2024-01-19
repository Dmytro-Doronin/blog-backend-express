import {body} from "express-validator";
import {blogQuery} from "../repositories/queryRepositories/blogQuery";
import {userQuery} from "../repositories/queryRepositories/userQuery";

export const authLogin = body('login')
    .isString()
    .trim()
    .isLength({min: 3, max: 10})
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('The field must not be less then 3 symbols and more then 10 symbols')
    .custom(async (value) => {
        const user = await userQuery.findUserByLoginOrEmail(value)

        if (user) {
            throw new Error('Login already exist')
        }

        return true
    }).withMessage('Login already exist')

export const authPassword = body('password')
    .isString()
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('The field must not be less then 6 symbols and more then 20 symbols')

export const authEmail = body('email')
    .isString()
    .trim()
    .isLength({min: 1})
    .isEmail()
    .custom(async (value) => {
        const userLogin = await userQuery.findUserByLoginOrEmail(value)

        if (userLogin) {
            throw new Error('Email already exist')
        }

        return true
    }).withMessage('Email already exist')
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email')

export const authCode = body('code')
    .isString()

export const authRegistrationValidationMiddleware = () => [authLogin, authPassword,authEmail]
export const authRegistrationConfirmationValidationMiddleware = () => [authCode]