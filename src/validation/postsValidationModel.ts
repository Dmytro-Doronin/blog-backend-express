import {body} from 'express-validator'

export const postTitle = body('title')
    .isString()
    .trim()
    .isLength({min: 1, max: 30}).withMessage('The field must not be more then 30 symbols')

export const postShortDescription = body('shortDescription')
    .isString()
    .trim()
    .isLength({min: 1, max: 100}).withMessage('The field must not be more then 100 symbols')

export const postContent = body('content')
    .isString()
    .trim()
    .isLength({min: 1, max: 1000}).withMessage('The field must not be more then 1000 symbols')

export const postBlogId  = body('blogId')
    .isString()
    .trim()

export const blogValidationModelMiddleware = () => [postTitle, postShortDescription, postContent, postBlogId]