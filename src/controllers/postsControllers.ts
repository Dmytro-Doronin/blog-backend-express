import {Request, Response} from "express";
import {postsRouterUtils} from "../repositories/posts/postsRouterUtils";
import {
    BlogInputModelType, ParamsType,
    PostInputModelType,
    RequestWithBody,
    RequestWithParams, RequestWithParamsAndBody
} from "../types/commonBlogTypeAndPosts.types";
import {blogRouterUtils} from "../repositories/blogs/blogRouterUtils";

export const getAllPostsController = async (req: Request, res: Response) => {
    try {
        const result = await postsRouterUtils.getAllPosts()
        return res.status(200).send(result)
    } catch (e) {
        throw new Error('Posts does not get')
    }

}

export const createNewPostController = async (req: RequestWithBody<PostInputModelType> , res: Response) => {

    try {
        const {title, shortDescription, content, blogId} = req.body

        const result = await postsRouterUtils.createPost({title, shortDescription, content, blogId})

        return res.status(201).send(result)

    } catch (e) {
        throw new Error('Blogs does not create')
    }


}

export const getPostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await postsRouterUtils.getPostById(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.status(200).send(result)

}

export const changePostByIdController = async (req: RequestWithParamsAndBody<ParamsType, PostInputModelType>, res: Response) => {

    const {title, shortDescription, content, blogId} = req.body
    const id = req.params.id

    const result = await postsRouterUtils.changePostById({id, title, shortDescription, content, blogId})

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const deletePostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await postsRouterUtils.deletePostById(req.params.id)

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}