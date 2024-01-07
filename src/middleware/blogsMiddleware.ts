import {Request, Response, NextFunction} from "express";
import {ParamsType, RequestWithParamsAndBody} from "../types/commonBlogTypeAndPosts.types";
import {BlogInputModelType} from "../types/commonBlogTypeAndPosts.types";
import {validationResult} from "express-validator";

export const errorMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const errors = validationResult(req).formatWith(error => {
        switch (error.type) {
            case "field": {
                return {
                    message: error.msg,
                    field: error.path
                }
            }
            default:
                return {
                    message: error.msg,
                    field: "not found"
                }
        }
    })

    if (!errors.isEmpty()) {
        const err = errors.array({onlyFirstError: true})

        return res.status(400).json({errorsMessages: err})
    } else {
        return next();
    }
}

export const changeBlogsByIdMiddleware = (
    req: RequestWithParamsAndBody<ParamsType, BlogInputModelType>,
    res: Response,
    next: NextFunction
) => {

    const errors = validationResult(req.body)

    if (!errors.isEmpty()) {
        res.status(400).send({errorsMessages: errors.array()})
    } else {
        next()
    }
}