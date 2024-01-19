import {Request, Response} from "express";
import {
    BlogInputModelType, CommentInputModelType, CommentsOutputModelType, ParamsType,
    PostInputModelType, PostsOutputModelType,
    RequestWithBody,
    RequestWithParams, RequestWithParamsAndBody, RequestWithParamsAndQuery, RequestWithQuery, ResponseWithData
} from "../types/commonBlogTypeAndPosts.types";
import {postQuery} from "../repositories/queryRepositories/postQuery";
import {postsService} from "../services/posts/postsService";
import {QueryCommentsInputModel, QueryPostInputModel} from "../types/posts/queryPosts.types";
import {commentsService} from "../services/comments/commentsService";


export const getAllPostsController = async (req: RequestWithQuery<QueryPostInputModel>, res: ResponseWithData<PostsOutputModelType>) => {

    // const sortData = req.query

    const sortData = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    try {
        const result = await postQuery.getAllPostsFromDb(sortData)
        return res.status(200).send(result)
    } catch (e) {
        throw new Error('Posts does not get')
    }
}

export const createNewPostController = async (req: RequestWithBody<PostInputModelType> , res: Response) => {

    try {
        const {title, shortDescription, content, blogId} = req.body

        const result = await postsService.createPostService({title, shortDescription, content, blogId})

        if (!result) {
            res.sendStatus(400)
            return
        }

        return res.status(201).send(result)

    } catch (e) {
        throw new Error('Blogs does not create')
    }


}

export const getPostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await postQuery.getPostByIdFromDb(req.params.id)

    if (!result) {
        return res.sendStatus(404)
    }

    return res.status(200).send(result)

}

export const changePostByIdController = async (req: RequestWithParamsAndBody<ParamsType, PostInputModelType>, res: Response) => {

    const {title, shortDescription, content, blogId} = req.body
    const id = req.params.id

    const result = await postsService.changePostByIdService({id, title, shortDescription, content, blogId})

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const deletePostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const result = await postsService.deletePostByIdService(req.params.id)

    if (result === null) {
        return res.sendStatus(404)
    }

    return res.sendStatus(204)
}

export const createCommentForPostController = async (req: RequestWithParamsAndBody<ParamsType, CommentInputModelType>, res: Response) => {

    const {content} = req.body
    const {id: postId} = req.params

    const comment = await commentsService.createComment(postId, content, req.user!.id, req.user!.accountData.login)

    if (comment === null) {
        res.sendStatus(404)
        return
    }
    res.status(201).send(comment)
    return

}

export const getAllCommentsForPostController = async (req: RequestWithParamsAndQuery<ParamsType, QueryCommentsInputModel>, res: ResponseWithData<CommentsOutputModelType> ) =>{
    const {id} = req.params

    const post = await postQuery.getPostByIdFromDb(id)

    if (!post) {
        res.sendStatus(404)
        return
    }


    const sortData: QueryCommentsInputModel = {
        sortBy: req.query.sortBy,
        sortDirection: req.query.sortDirection,
        pageNumber: req.query.pageNumber,
        pageSize: req.query.pageSize
    }

    const comments = await postQuery.getAllCommentsForPostFromDb(id, sortData)

    return res.status(200).send(comments)
}