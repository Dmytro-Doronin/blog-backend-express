import {check} from 'express-validator'

export const loginOrEmail = check('loginOrEmail')
    .isString()

export const password = check('password')
    .isString()

export const loginValidationModelMiddleware = () => [loginOrEmail, password]