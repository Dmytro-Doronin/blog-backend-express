import {
    CommentInputModelType, CommentViewModelType, LikeStatusType,
    ParamsType, RequestWithBody,
    RequestWithParams,
    RequestWithParamsAndBody, ResponseWithData
} from "../types/commonBlogTypeAndPosts.types";
import {CommentQuery} from "../repositories/queryRepositories/commentQuery";
import {Response} from "express";
import {CommentsService} from "../services/comments/commentsService";
import {likeService} from "../services/likes/likeService";
import {likeMutation} from "../repositories/mutationRepositories/likeMutation";
import {CommentMutation} from "../repositories/mutationRepositories/commentMutation";
import {inject, injectable} from "inversify";


@injectable()
export class CommentsController {
    constructor(@inject(CommentQuery) protected commentQuery: CommentQuery,
                @inject(CommentsService) protected commentsService: CommentsService,
                @inject(CommentMutation) protected commentMutation: CommentMutation) {}

    async getCommentByIdController (req: RequestWithParams<ParamsType>, res: ResponseWithData<CommentViewModelType>) {

        const commentId = req.params.id
        const userId = req.userId
        const comment = await this.commentQuery.getCommentById(commentId, userId)

        if (!comment) {
            res.sendStatus(404)
            return
        }

        res.status(200).send(comment)

    }

    async changeCommentByIdController (req: RequestWithParamsAndBody<ParamsType, CommentInputModelType>, res: Response) {

        const id = req.params.id
        const content = req.body.content
        const userId = req.userId
        const comment = await this.commentQuery.getCommentById(id, userId)

        if (!comment) {
            res.sendStatus(404)
            return
        }

        const currenUserId = req.user!.id

        if (currenUserId !== comment.commentatorInfo.userId) {
            res.sendStatus(403)
            return
        }

        await this.commentsService.changeComment(comment.id, content)

        res.sendStatus(204)
        return
    }

    async deleteCommentByIdController (req: RequestWithParams<ParamsType>, res: Response) {

        const id = req.params.id

        const comment = await this.commentQuery.getCommentById(id)

        if (!comment) {
            res.sendStatus(404)
            return
        }

        const currenUserId = req.user!.id

        if (currenUserId !== comment.commentatorInfo.userId) {
            res.sendStatus(403)
            return
        }

        await this.commentsService.deleteComment(comment.id)

        res.sendStatus(204)
        return
    }

    async setLikeStatusForCommentsController (req: RequestWithParamsAndBody<ParamsType, LikeStatusType> , res: Response) {
        const target = "Comment"
        const commentId = req.params.id
        const likeStatus = req.body.likeStatus
        const userId = req.userId

        const comment = await this.commentMutation.getCommentById(commentId)

        if (!comment) {
            res.sendStatus(404)
            return
        }

        const likeOrDislike = await likeMutation.getLike(userId, commentId)

        if (!likeOrDislike) {
            await likeService.createLike(commentId, likeStatus, userId, target)
            res.sendStatus(204)
            return
        }

        if (likeStatus === likeOrDislike.type) {
            res.sendStatus(204)
            return
        }

        const result = await likeService.changeLikeStatus(commentId, likeStatus, userId, target)

        if (!result) {
            res.sendStatus(404)
            return
        }

        res.sendStatus(204)
        return
    }
}


