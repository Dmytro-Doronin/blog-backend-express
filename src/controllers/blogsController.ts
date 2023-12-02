import {Request, Response} from "express";
import {BlogInputModelType, RequestWithParamsAndBody} from "../types/commonBlogTypeAndPosts.types";
import {RequestWithBody, RequestWithParams, ParamsType} from "../types/commonBlogTypeAndPosts.types";
import {blogDB} from "../db/db";
import {blogRouterUtils} from "../utils/blogs/blogRouterUtils";

// export const deleteAllDataFromBlogsAndPostsController = (req: Request, res: Response) => {
//     return res.status(200).send(blogDB.blogs)
// }

export const getAllBlogsController = (req: Request, res: Response) => {
    return res.status(200).send(blogDB.blogs)
}

export const createNewBlogController = (req: RequestWithBody<BlogInputModelType> , res: Response) => {

    const {name,description, websiteUrl} = req.body

    const result = blogRouterUtils.createBlog({name, description, websiteUrl})

    return res.status(201).send(result)

}


export const getBlogsByIdController = (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = blogRouterUtils.getBlogById(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.status(200).send(result)

}


export const changeBlogsByIdController = (req: RequestWithParamsAndBody<ParamsType, BlogInputModelType>, res: Response) => {

    const {name, description, websiteUrl} = req.body
    const id = req.params.id

    const rusult = blogRouterUtils.changeBlogById({id, name, description, websiteUrl})

    if (rusult === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const deleteBlogsByIdController = (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = blogRouterUtils.deleteBlogById(req.params.id)

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)

}


