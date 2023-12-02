import {body} from 'express-validator'

export const blogName = body('name').trim().isLength({min: 1, max: 15})
export const blogDescription = body('description').trim().isLength({ max: 500})
export const blogWebsiteUrl = body('websiteUrl')
    .trim()
    .isLength({ max: 100})
    .custom(WebsiteUrl => {
        const pattern = /^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/

        if (!pattern.test(WebsiteUrl)) {
            return {message: 'invalid WebsiteUrl', field: 'websiteUrl'}
        }

        return true
    })
