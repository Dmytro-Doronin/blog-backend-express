import {Response, NextFunction} from "express";
import {ParamsType, RequestWithBody, RequestWithParamsAndBody} from "../types/commonBlogTypeAndPosts.types";
import {BlogInputModelType} from "../types/commonBlogTypeAndPosts.types";
import {validationResult} from "express-validator";

export const createBlogMiddleware = (req: RequestWithBody<BlogInputModelType>, res: Response, next: NextFunction) => {

    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
        res.status(400).send({errorMessage: errors.array()})
    } else {
        next()
    }
}

export const changeBlogsByIdMiddleware = (
    req: RequestWithParamsAndBody<ParamsType, BlogInputModelType>,
    res: Response,
    next: NextFunction
) => {

    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
        res.status(400).send({errorMessage: errors.array()})
    } else {
        next()
    }
}