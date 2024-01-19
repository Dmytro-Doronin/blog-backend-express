import {body} from "express-validator";
import {blogQuery} from "../repositories/queryRepositories/blogQuery";
import {userQuery} from "../repositories/queryRepositories/userQuery";
import {authQuery} from "../repositories/queryRepositories/authQuery";

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
        const userEmail = await userQuery.findUserByLoginOrEmail(value)

        if (userEmail) {
            throw new Error('Email already exist')
        }

        return true
    }).withMessage('Email already exist')
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email')

export const authCode = body('code')
    .isString()
    .notEmpty()
    .custom(async (value) => {
        const user = await authQuery.getUserByConfirmationCode(value)

        if (user?.emailConfirmation.isConfirmed) {
            throw new Error('Code already confirmed')
        }

        return true
    }).withMessage('Code already confirmed')

export const authEmailResending = body('email')
    .isString()
    .trim()
    .isLength({min: 1})
    .isEmail()
    .custom(async (value) => {
        const userEmail = await userQuery.findUserByLoginOrEmail(value)

        if (!userEmail) {
            throw new Error('User dos not exist')
        }

        if (userEmail.emailConfirmation.isConfirmed) {
            throw new Error('Email already confirmed')
        }

    }).withMessage('Email already confirmed')
    // .matches('^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$')
    .withMessage('Wrong email')

export const authRegistrationValidationMiddleware = () => [authLogin, authPassword,authEmail]
export const authRegistrationConfirmationValidationMiddleware = () => [authCode]
export const authEmailResendingValidationMiddleware = () => [authEmailResending]