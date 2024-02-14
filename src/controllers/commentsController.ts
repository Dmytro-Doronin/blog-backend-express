import {
    CommentInputModelType, CommentViewModelType, LikeStatusType,
    ParamsType, RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody, ResponseWithData
} from "../types/commonBlogTypeAndPosts.types";
import {commentQuery} from "../repositories/queryRepositories/commentQuery";
import {Response} from "express";
import {commentsService} from "../services/comments/commentsService";

export const getCommentByIdController = async (req: RequestWithParams<ParamsType>, res: ResponseWithData<CommentViewModelType>) => {

    const id = req.params.id
    const userId = req.userId
    const comment = await commentQuery.getCommentById(id, userId)

    if (!comment) {
        res.sendStatus(404)
        return
    }

    res.status(200).send(comment)

}

export const changeCommentByIdController = async (req: RequestWithParamsAndBody<ParamsType, CommentInputModelType>, res: Response) => {

    const id = req.params.id
    const content = req.body.content
    const comment = await commentQuery.getCommentById(id)

    if (!comment) {
        res.sendStatus(404)
        return
    }

    const currenUserId = req.user!.id

    if (currenUserId !== comment.commentatorInfo.userId) {
        res.sendStatus(403)
        return
    }

    await commentsService.changeComment(comment.id, content)

    res.sendStatus(204)
    return
}

export const deleteCommentByIdController = async (req: RequestWithParams<ParamsType>, res: Response) => {

    const id = req.params.id

    const comment = await commentQuery.getCommentById(id)

    if (!comment) {
        res.sendStatus(404)
        return
    }

    const currenUserId = req.user!.id

    if (currenUserId !== comment.commentatorInfo.userId) {
        res.sendStatus(403)
        return
    }

    await commentsService.deleteComment(comment.id)

    res.sendStatus(204)
    return
}

export const setLikeStatusController = async (req: RequestWithParamsAndBody<ParamsType, LikeStatusType> , res: Response) => {

    const commentId = req.params.id
    const likeStatus = req.body.likeStatus
    const userId = req.userId

    const result = await commentsService.changeLikeStatus(commentId, likeStatus, userId)

    if (!result) {
        res.sendStatus(404)
        return
    }

    res.sendStatus(204)
    return
}
