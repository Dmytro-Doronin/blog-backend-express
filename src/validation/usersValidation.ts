import {body} from "express-validator";

export const userLogin = body('login')
    .isString()
    .trim()
    .isLength({min: 3, max: 10})
    .matches('^[a-zA-Z0-9_-]*$')
    .withMessage('The field must not be less then 3 symbols and more then 10 symbols')

export const userPassword = body('password')
    .isString()
    .trim()
    .isLength({min: 6, max: 20})
    .withMessage('The field must not be less then 6 symbols and more then 20 symbols')

export const userEmail = body('email')
    .isString()
    .trim()
    .matches('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$\n')
    .withMessage('The field must not be less then 6 symbols and more then 20 symbols')

export const userValidationMiddleware = () => [userLogin, userPassword,userEmail]