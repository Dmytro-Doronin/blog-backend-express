import {
    CommentsOutputModelType,
    CommentsPaginationDbModelType, likeStatusType, PostDbMappedModelType, PostDbModelType,
    PostInputModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {PostMutation} from "../../repositories/mutationRepositories/postMutation";
import {CreatePostsServiceType} from "../serviceTypes/postsTypes";
import {BlogQuery} from "../../repositories/queryRepositories/blogQuery";
import {QueryCommentsInputModel, QueryPostInputModel} from "../../types/posts/queryPosts.types";
import {likeMutation} from "../../repositories/mutationRepositories/likeMutation";
import {postMapper} from "../../utils/mapper";
import {LikeModel, PostModel} from "../../db/schemes";
import {filterForSort} from "../../utils/sortUtils";
const { v4: uuidv4 } = require('uuid');
import {inject, injectable} from "inversify";


@injectable()
export class PostsService  {
    constructor(@inject(PostMutation) protected postMutation: PostMutation,
                @inject(BlogQuery) protected blogQuery: BlogQuery) {}
    async getAllPosts (sortData: QueryPostInputModel, userId: string, blogId: null | string = null) {
        const posts: PostDbMappedModelType = await this.postMutation.getAllPosts(sortData, blogId)

        return this._mapPosts(posts, userId)

    }
    async createPostService ({title, shortDescription, content, blogId}: PostInputModelType) {

        const blog = await this.blogQuery.getBlogByIdInDb(blogId)

        if (!blog) {
            return null
        }

        const newPost: PostDbModelType = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId,
            createdAt: (new Date().toISOString()),
            blogName: blog.name
        }

        const post = await this.postMutation.createPostInDb(newPost)

        if (!post) {
            return null
        }

       return postMapper(post)
    }
    async changePostByIdService ({id, title, shortDescription, content, blogId}: CreatePostsServiceType) {
        return await this.postMutation.changePostByIdInDb({id, title, shortDescription, content, blogId})
    }

    async deletePostByIdService (id: string) {
        return await this.postMutation.deletePostByIdInDb(id)
    }

    async getAllCommentsForPostService (postId: string, sortData: QueryCommentsInputModel, userId: string) {

        const comments: CommentsPaginationDbModelType = await this.postMutation.getAllCommentForPostFromDb(postId, sortData)

        return this._mapCommentService(comments, userId)
    }
    async _mapCommentService (comments: CommentsPaginationDbModelType, userId: string): Promise<CommentsOutputModelType> {

        const mappedItems = await Promise.all(comments.items.map(async (item) => {
            let status: likeStatusType | undefined

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
    async _mapPosts (posts: PostDbMappedModelType, userId: string) {
        const mappedItems = await Promise.all(posts.items.map(async (item) => {
            let status: likeStatusType | undefined

            if (userId) {
                const likeForCurrentComment = await likeMutation.getLike(userId, item.id);
                status = likeForCurrentComment?.type
            }


            const allLikesAndDislikesForCurrentComment = await likeMutation.getAllLikesAndDislikesForComment(item.id);
            const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
            const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");


            const likesFromDb = await LikeModel
                .find({type: 'Like', targetId: item.id,})
                .sort({['addedAt']: -1})
                .limit(3)
                .lean()

            const newestLikes = likesFromDb.map(item => {
                return {
                    addedAt: item.addedAt,
                    userId: item.userId,
                    login: item.login
                }
            })

            return {
                id: item.id,
                title: item.title,
                shortDescription: item.shortDescription,
                content: item.content,
                blogId: item.blogId,
                blogName: item.blogName,
                createdAt: item.createdAt,
                extendedLikesInfo: {
                    likesCount: likes.length ?? 0,
                    dislikesCount: dislikes.length ?? 0,
                    myStatus: status ?? "None",
                    newestLikes : newestLikes
                }
            };
        }));

        return {
            pagesCount: posts.pagesCount,
            page: posts.page,
            pageSize: posts.pageSize,
            totalCount: posts.totalCount,
            items: mappedItems
        };
    }
}