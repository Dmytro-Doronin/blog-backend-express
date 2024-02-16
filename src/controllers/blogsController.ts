import {Request, Response} from "express";
import {
    BlogInputModelType, BlogOutputModelType, CreatePostToBlogType,
    RequestWithParamsAndBody, RequestWithParamsAndQuery,
    RequestWithQuery,
    ResponseWithData
} from "../types/commonBlogTypeAndPosts.types";
import {RequestWithBody, RequestWithParams, ParamsType} from "../types/commonBlogTypeAndPosts.types";
import {blogQuery} from "../repositories/queryRepositories/blogQuery";
import {blogsService} from "../services/blogs/blogsService";
import {QueryBlogInputModel, QueryBlogToPostsInputModel} from "../types/blogs/queryBlog.types";

// export const deleteAllDataFromBlogsAndPostsController = (req: Request, res: Response) => {
//     return res.status(200).send(blogDB.blogs)
// }

export const getAllBlogsController = async (req: RequestWithQuery<QueryBlogInputModel>, res: ResponseWithData<BlogOutputModelType>) => {
        // const sortData = req.query
    const sortData = {
        searchNameTerm: req.query.searchNameTerm,
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }
        const result = await blogQuery.getAllBlogInDb(sortData)
        return res.status(200).send(result)
}

export const getAllPostInBlogController = async (req: RequestWithParamsAndQuery<ParamsType, QueryBlogToPostsInputModel>, res: Response) => {
    const blogId = req.params.id
    // const sortData = req.query
    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }
    const blog = await blogQuery.getBlogByIdInDb(blogId)

    if (!blog) {
        res.sendStatus(404)
        return
    }

    const posts = await blogQuery.getAllPostsInBlogFromDb(blogId, sortData)

    return res.status(200).send(posts)

}

export const createNewBlogController = async (req: RequestWithBody<BlogInputModelType> , res: Response) => {

        const {name,description, websiteUrl} = req.body

        const result = await blogsService.createBlogService({name, description, websiteUrl})

        return res.status(201).send(result)
}

export const createPostToBlogController = async (req: RequestWithParamsAndBody<ParamsType, CreatePostToBlogType>, res: Response) => {
    const id = req.params
    const {title, shortDescription, content} = req.body

    const post = await blogsService.createPostToBlogService(id, {title, shortDescription, content})

    if (!post) {
        res.sendStatus(404)
        return
    }

    res.status(201).send(post)
}

export const getBlogsByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await blogQuery.getBlogByIdInDb(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.status(200).send(result)

}


export const changeBlogsByIdController = async (req: RequestWithParamsAndBody<ParamsType, BlogInputModelType>, res: Response) => {

    const {name, description, websiteUrl} = req.body
    const id = req.params.id

    const result = await blogsService.changeBlogByIdService({id, name, description, websiteUrl})

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const deleteBlogsByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await blogsService.deleteBlogByIdService(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)


}


