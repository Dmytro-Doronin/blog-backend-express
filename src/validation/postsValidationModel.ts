import {body} from 'express-validator'
import {blogQuery} from "../repositories/queryRepositories/blogQuery";

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
    .custom(async (value) => {
        const blog = await blogQuery.getBlogByIdInDb(value)

        if (!blog) {
            throw new Error('Incorrect blogId')
        }

        return true
    }).withMessage('Incorrect blogId')


export const postsValidationModelMiddleware = () => [postTitle, postShortDescription, postContent, postBlogId]
export const createPostToBlogModelMiddleware = () => [postTitle, postShortDescription, postContent]