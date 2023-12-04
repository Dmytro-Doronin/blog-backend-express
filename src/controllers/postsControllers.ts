import {Request, Response} from "express";
import {postsRouterUtils} from "../utils/posts/postsRouterUtils";
import {
    BlogInputModelType, ParamsType,
    PostInputModelType,
    RequestWithBody,
    RequestWithParams, RequestWithParamsAndBody
} from "../types/commonBlogTypeAndPosts.types";
import {blogRouterUtils} from "../utils/blogs/blogRouterUtils";

export const getAllPostsController = (req: Request, res: Response) => {
    const result = postsRouterUtils.getAllPosts()
    return res.status(200).send(result)
}

export const createNewPostController = (req: RequestWithBody<PostInputModelType> , res: Response) => {

    const {title, shortDescription, content, blogId} = req.body

    const result = postsRouterUtils.createPost({title, shortDescription, content, blogId})

    return res.status(201).send(result)
}

export const getPostByIdController = (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = postsRouterUtils.getPostById(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.status(200).send(result)

}

export const changePostByIdController = (req: RequestWithParamsAndBody<ParamsType, PostInputModelType>, res: Response) => {

    const {title, shortDescription, content, blogId} = req.body
    const id = req.params.id

    const result = postsRouterUtils.changePostById({id, title, shortDescription, content, blogId})

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const deletePostByIdController = (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = postsRouterUtils.deletePostById(req.params.id)

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}