import {
    CommentsOutputModelType,
    CommentsPaginationDbModelType, likeStatusType,
    PostInputModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {postMutation} from "../../repositories/mutationRepositories/postMutation";
import {CreatePostsServiceType} from "../serviceTypes/postsTypes";
import {blogQuery} from "../../repositories/queryRepositories/blogQuery";
import {QueryCommentsInputModel} from "../../types/posts/queryPosts.types";
import {likeMutation} from "../../repositories/mutationRepositories/likeMutation";
const { v4: uuidv4 } = require('uuid');

export const postsService = {
    async createPostService ({title, shortDescription, content, blogId}: PostInputModelType) {

        const blog = await blogQuery.getBlogByIdInDb(blogId)

        if (!blog) {
            return null
        }

        const newPost: PostViewModelType = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId,
            createdAt: (new Date().toISOString()),
            blogName: blog.name
        }

       return await postMutation.createPostInDb(newPost)
    },

    async changePostByIdService ({id, title, shortDescription, content, blogId}: CreatePostsServiceType) {
        return await postMutation.changePostByIdInDb({id, title, shortDescription, content, blogId})
    },

    async deletePostByIdService (id: string) {
        return await postMutation.deletePostByIdInDb(id)
    },

    async getAllCommentsForPostService (postId: string, sortData: QueryCommentsInputModel, userId: string) {

        const comments: CommentsPaginationDbModelType = await postMutation.getAllCommentForPostFromDb(postId, sortData)

        return this._mapService(comments, userId)
    },
    async _mapService (comments: CommentsPaginationDbModelType, userId: string): Promise<CommentsOutputModelType> {
        // return {
        //     pagesCount: comments.pagesCount,
        //     page: comments.page,
        //     pageSize: comments.pageSize,
        //     totalCount: comments.totalCount,
        //     items: comments.items.map( async (item) => {
        //         const likeForCurrentComment = await likeMutation.getLike(userId, item.id)
        //         const allLikesAndDislikesForCurrentComment = await likeMutation.getAllLikesAndDislikesForComment(item.id)
        //         const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like")
        //         const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike")
        //
        //         return {
        //             id: item.id,
        //             content: item.content,
        //             commentatorInfo: item.commentatorInfo,
        //             createdAt: item.createdAt,
        //             likesInfo: {
        //                 likesCount: likes.length ?? 0,
        //                 dislikesCount: dislikes.length ?? 0,
        //                 myStatus: likeForCurrentComment?.type ?? "None"
        //             }
        //         }
        //     })
        // }

        const mappedItems = await Promise.all(comments.items.map(async (item) => {
            let status: likeStatusType | undefined = "None"

            if (userId) {
                const likeForCurrentComment = await likeMutation.getLike(userId, item.id);
                status = likeForCurrentComment?.type
            }


            const allLikesAndDislikesForCurrentComment = await likeMutation.getAllLikesAndDislikesForComment(item.id);
            const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
            const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");

            return {
                id: item.id,
                content: item.content,
                commentatorInfo: item.commentatorInfo,
                createdAt: item.createdAt,
                likesInfo: {
                    likesCount: likes.length ?? 0,
                    dislikesCount: dislikes.length ?? 0,
                    myStatus: status ?? "None"
                }
            };
        }));

        return {
            pagesCount: comments.pagesCount,
            page: comments.page,
            pageSize: comments.pageSize,
            totalCount: comments.totalCount,
            items: mappedItems
        };
    }
}