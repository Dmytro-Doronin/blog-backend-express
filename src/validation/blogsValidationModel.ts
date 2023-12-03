import {body, check} from 'express-validator'

export const blogName = check('name')
    .isString()
    .trim()
    .isLength({min: 1, max: 15}).withMessage('The field must not be more then 15 symbols')

export const blogDescription = check('description')
    .isString()
    .trim()
    .isLength({min: 1, max: 500}).withMessage('The field must not be more then 500 symbols')

export const blogWebsiteUrl = check('websiteUrl')
    .isString()
    .trim()
    .isLength({min: 1, max: 100}).withMessage('The field must not be more then 100 symbols')
    .matches('^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$')
    .withMessage('Incorrect websiteUrl')

export const blogValidationModelMiddleware = () => [blogName, blogDescription, blogWebsiteUrl]