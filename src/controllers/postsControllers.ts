import {Request, Response} from "express";
import {
    BlogInputModelType, CommentInputModelType, CommentsOutputModelType, LikeStatusType, ParamsType,
    PostInputModelType, PostsOutputModelType, PostViewModelType,
    RequestWithBody,
    RequestWithParams, RequestWithParamsAndBody, RequestWithParamsAndQuery, RequestWithQuery, ResponseWithData
} from "../types/commonBlogTypeAndPosts.types";
import {PostQuery} from "../repositories/queryRepositories/postQuery";
import {PostsService} from "../services/posts/postsService";
import {QueryCommentsInputModel, QueryPostInputModel} from "../types/posts/queryPosts.types";
import {CommentsService} from "../services/comments/commentsService";
import {CommentMutation} from "../repositories/mutationRepositories/commentMutation";
import {likeMutation} from "../repositories/mutationRepositories/likeMutation";
import {likeService} from "../services/likes/likeService";
import {PostMutation} from "../repositories/mutationRepositories/postMutation";
import {inject, injectable} from "inversify";

@injectable()
export class PostController {

    constructor(@inject(PostQuery) protected postQuery: PostQuery,
                @inject(PostsService) protected postsService: PostsService,
                @inject(CommentsService) protected commentsService: CommentsService,
                @inject(PostMutation) protected postMutation: PostMutation) {}
    async getAllPostsController  (req: RequestWithQuery<QueryPostInputModel>, res: ResponseWithData<PostsOutputModelType>) {

        const userId = req.userId

        const sortData = {
            sortBy: req.query.sortBy,
            sortDirection: req.query.sortDirection,
            pageNumber: req.query.pageNumber,
            pageSize: req.query.pageSize
        }

        const result: PostsOutputModelType = await this.postsService.getAllPosts(sortData, userId)
        return res.status(200).send(result)

    }

    async createNewPostController  (req: RequestWithBody<PostInputModelType> , res: Response)  {

        const {title, shortDescription, content, blogId} = req.body

        const result = await this.postsService.createPostService({title, shortDescription, content, blogId})

        if (!result) {
            res.sendStatus(400)
            return
        }

        return res.status(201).send(result)

    }

    async getPostByIdController  (req: RequestWithParams<ParamsType>, res: Response) {

        const userId = req.userId
        const postId = req.params.id
        const result = await this.postQuery.getPostByIdFromDb(postId, userId)

        if (!result) {
            return res.sendStatus(404)
        }

        return res.status(200).send(result)

    }

    async changePostByIdController (req: RequestWithParamsAndBody<ParamsType, PostInputModelType>, res: Response) {

        const {title, shortDescription, content, blogId} = req.body
        const id = req.params.id

        const result = await this.postsService.changePostByIdService({id, title, shortDescription, content, blogId})

        if (result === null) {
            return res.sendStatus(404)
        }

        return res.sendStatus(204)
    }

    async deletePostByIdController (req: RequestWithParams<ParamsType>, res: Response) {

        const result = await this.postsService.deletePostByIdService(req.params.id)

        if (!result) {
            return res.sendStatus(404)
        }

        return res.sendStatus(204)
    }

    async createCommentForPostController (req: RequestWithParamsAndBody<ParamsType, CommentInputModelType>, res: Response) {

        const {content} = req.body
        const {id: postId} = req.params

        const comment = await this.commentsService.createComment(postId, content, req.user!.id, req.user!.accountData.login)

        if (comment === null) {
            res.sendStatus(404)
            return
        }
        res.status(201).send(comment)
        return

    }

    async getAllCommentsForPostController (req: RequestWithParamsAndQuery<ParamsType, QueryCommentsInputModel>, res: ResponseWithData<CommentsOutputModelType> ) {
        const postId = req.params.id
        const userId = req.userId
        const post = await this.postQuery.getPostByIdFromDb(postId, userId)

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

        const comments = await this.postsService.getAllCommentsForPostService(postId, sortData, userId)

        return res.status(200).send(comments)
    }

    async setLikeStatusForPostsController  (req: RequestWithParamsAndBody<ParamsType, LikeStatusType> , res: Response) {
        const target = "Post"
        const postId = req.params.id
        const likeStatus = req.body.likeStatus
        const userId = req.userId

        const post = await this.postMutation.getPostById(postId)

        if (!post) {
            res.sendStatus(404)
            return
        }

        const likeOrDislike = await likeMutation.getLike(userId, postId)

        if (!likeOrDislike) {
            await likeService.createLike(postId, likeStatus, userId, target)
            res.sendStatus(204)
            return
        }

        if (likeStatus === likeOrDislike.type) {
            res.sendStatus(204)
            return
        }

        const result = await likeService.changeLikeStatus(postId, likeStatus, userId, target)

        if (!result) {
            res.sendStatus(404)
            return
        }

        res.sendStatus(204)
        return
    }
}


// export const getAllPostsController = async (req: RequestWithQuery<QueryPostInputModel>, res: ResponseWithData<PostsOutputModelType>) => {
//
//     const userId = req.userId
//
//     const sortData = {
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize
//     }
//
//     const result: PostsOutputModelType = await postsService.getAllPosts(sortData, userId)
//     return res.status(200).send(result)
//
// }
//
// export const createNewPostController = async (req: RequestWithBody<PostInputModelType> , res: Response) => {
//
//     const {title, shortDescription, content, blogId} = req.body
//
//     const result = await postsService.createPostService({title, shortDescription, content, blogId})
//
//     if (!result) {
//         res.sendStatus(400)
//         return
//     }
//
//     return res.status(201).send(result)
//
// }
//
// export const getPostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
//
//     const userId = req.userId
//     const postId = req.params.id
//     const result = await postQuery.getPostByIdFromDb(postId, userId)
//
//     if (!result) {
//         return res.sendStatus(404)
//     }
//
//     return res.status(200).send(result)
//
// }
//
// export const changePostByIdController = async (req: RequestWithParamsAndBody<ParamsType, PostInputModelType>, res: Response) => {
//
//     const {title, shortDescription, content, blogId} = req.body
//     const id = req.params.id
//
//     const result = await postsService.changePostByIdService({id, title, shortDescription, content, blogId})
//
//     if (result === null) {
//         return res.sendStatus(404)
//     }
//
//     return res.sendStatus(204)
// }
//
// export const deletePostByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {
//
//     const result = await postsService.deletePostByIdService(req.params.id)
//
//     if (!result) {
//         return res.sendStatus(404)
//     }
//
//     return res.sendStatus(204)
// }
//
// export const createCommentForPostController = async (req: RequestWithParamsAndBody<ParamsType, CommentInputModelType>, res: Response) => {
//
//     const {content} = req.body
//     const {id: postId} = req.params
//
//     const comment = await commentsService.createComment(postId, content, req.user!.id, req.user!.accountData.login)
//
//     if (comment === null) {
//         res.sendStatus(404)
//         return
//     }
//     res.status(201).send(comment)
//     return
//
// }
//
// export const getAllCommentsForPostController = async (req: RequestWithParamsAndQuery<ParamsType, QueryCommentsInputModel>, res: ResponseWithData<CommentsOutputModelType> ) =>{
//     const postId = req.params.id
//     const userId = req.userId
//     const post = await postQuery.getPostByIdFromDb(postId, userId)
//
//     if (!post) {
//         res.sendStatus(404)
//         return
//     }
//
//
//     const sortData: QueryCommentsInputModel = {
//         sortBy: req.query.sortBy,
//         sortDirection: req.query.sortDirection,
//         pageNumber: req.query.pageNumber,
//         pageSize: req.query.pageSize
//     }
//
//     const comments = await postsService.getAllCommentsForPostService(postId, sortData, userId)
//
//     return res.status(200).send(comments)
// }
//
// export const setLikeStatusForPostsController = async (req: RequestWithParamsAndBody<ParamsType, LikeStatusType> , res: Response) => {
//     const target = "Post"
//     const postId = req.params.id
//     const likeStatus = req.body.likeStatus
//     const userId = req.userId
//
//     const post = await postMutation.getPostById(postId)
//
//     if (!post) {
//         res.sendStatus(404)
//         return
//     }
//
//     const likeOrDislike = await likeMutation.getLike(userId, postId)
//
//     if (!likeOrDislike) {
//         await likeService.createLike(postId, likeStatus, userId, target)
//         res.sendStatus(204)
//         return
//     }
//
//     if (likeStatus === likeOrDislike.type) {
//         res.sendStatus(204)
//         return
//     }
//
//     const result = await likeService.changeLikeStatus(postId, likeStatus, userId, target)
//
//     if (!result) {
//         res.sendStatus(404)
//         return
//     }
//
//     res.sendStatus(204)
//     return
// }