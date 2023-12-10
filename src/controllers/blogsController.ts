import {Request, Response} from "express";
import {BlogInputModelType, RequestWithParamsAndBody} from "../types/commonBlogTypeAndPosts.types";
import {RequestWithBody, RequestWithParams, ParamsType} from "../types/commonBlogTypeAndPosts.types";
import {blogRouterUtils} from "../utils/blogs/blogRouterUtils";

// export const deleteAllDataFromBlogsAndPostsController = (req: Request, res: Response) => {
//     return res.status(200).send(blogDB.blogs)
// }

export const getAllBlogsController = async (req: Request, res: Response) => {
        const result = await blogRouterUtils.getAllBlog()
        return res.status(200).send(result)
}

export const createNewBlogController = async (req: RequestWithBody<BlogInputModelType> , res: Response) => {

        const {name,description, websiteUrl} = req.body

        const result = await blogRouterUtils.createBlog({name, description, websiteUrl})

        return res.status(201).send(result)


}


export const getBlogsByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await blogRouterUtils.getBlogById(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.status(200).send(result)

}


export const changeBlogsByIdController = async (req: RequestWithParamsAndBody<ParamsType, BlogInputModelType>, res: Response) => {

    const {name, description, websiteUrl} = req.body
    const id = req.params.id

    const result = await blogRouterUtils.changeBlogById({id, name, description, websiteUrl})

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const deleteBlogsByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await blogRouterUtils.deleteBlogById(req.params.id)

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)

}


