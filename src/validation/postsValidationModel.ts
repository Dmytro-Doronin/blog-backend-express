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

export const commentContent = body('content')
    .isString()
    .trim()
    .isLength({min: 20, max: 300}).withMessage('The field must not be more then 300 and less then 20 symbols')

export const likeStatus = body('likeStatus')
    .isString()
    .trim()
    .isIn(['None', 'Like', 'Dislike'])
    .withMessage('Your field must be: None, Like or Dislike')

export const postsValidationModelMiddleware = () => [postTitle, postShortDescription, postContent, postBlogId]
export const createPostToBlogModelMiddleware = () => [postTitle, postShortDescription, postContent]
export const createCommentToPostModelMiddleware = () => [commentContent]
export const likeStatusModelMiddleware = () => [likeStatus]