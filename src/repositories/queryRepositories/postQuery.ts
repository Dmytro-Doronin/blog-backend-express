import {commentMapper, postMapper} from "../../utils/mapper";

import {client} from "../../db/db";
import {
    likeStatusType,
    PostDbMappedModelType,
    PostDbModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {QueryCommentsInputModel, QueryPostInputModel} from "../../types/posts/queryPosts.types";
import {filterForSort} from "../../utils/sortUtils";
import {CommentModel, LikeModel, PostModel} from "../../db/schemes";
import {likeMutation} from "../mutationRepositories/likeMutation";


export const postQuery = {
    // async getAllPostsFromDb (sortData: QueryPostInputModel, userId: string) {
    //
    //     const sortBy = sortData.sortBy ?? 'createdAt'
    //     const sortDirection = sortData.sortDirection ?? 'desc'
    //     const pageNumber = sortData.pageNumber ?? 1
    //     const pageSize = sortData.pageSize ?? 10
    //
    //     try {
    //         const posts = await PostModel
    //             .find({})
    //             .sort(filterForSort(sortBy, sortDirection))
    //             .skip((+pageNumber - 1) * +pageSize)
    //             .limit(+pageSize)
    //             .lean()
    //
    //         const totalCount = await PostModel.countDocuments({})
    //
    //         const pagesCount = Math.ceil(totalCount / +pageSize)
    //         return {
    //             pagesCount,
    //             page: +pageNumber,
    //             pageSize: +pageSize,
    //             totalCount,
    //             items: this._mapPosts(posts, userId)
    //         }
    //     } catch (e) {
    //         throw new Error('Posts was not get')
    //     }
    // },

    async getPostByIdFromDb (postId: string, userId: string = '') {
        try {
            const post = await PostModel.findOne({id: postId}).lean()

            if (!post) {
                return null
            }

            let status: likeStatusType | undefined
            if (userId) {
                const like = await LikeModel.findOne({targetId: postId, userId: userId}).lean()
                status = like?.type
            }
            const allLikesAndDislikesForCurrentComment = await LikeModel.find({targetId: postId}).lean();
            const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
            const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");


            const likesFromDb = await LikeModel
                .find({type: 'Like', targetId: postId, target: 'Post'})
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
                id:	post.id,
                title: post.title,
                shortDescription: post.shortDescription,
                content: post.content,
                blogId: post.blogId,
                blogName: post.blogName,
                createdAt: post.createdAt,
                extendedLikesInfo: {
                    likesCount: likes.length ?? 0,
                    dislikesCount: dislikes.length ?? 0,
                    myStatus: status ?? "None",
                    newestLikes : newestLikes ?? []
                }
            }
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },

    // async _mapPosts (posts: PostDbModelType[], userId: string) {
    //     const mappedItems = await Promise.all(posts.map(async (item) => {
    //         let status: likeStatusType | undefined
    //
    //         if (userId) {
    //             const likeForCurrentComment = await likeMutation.getLike(userId, item.id);
    //             status = likeForCurrentComment?.type
    //         }
    //
    //
    //         const allLikesAndDislikesForCurrentComment = await likeMutation.getAllLikesAndDislikesForComment(item.id);
    //         const likes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Like");
    //         const dislikes = allLikesAndDislikesForCurrentComment.filter(item => item.type === "Dislike");
    //
    //
    //         const likesFromDb = await LikeModel
    //             .find({type: 'Like'})
    //             .sort({['addedAt']: 1})
    //             .limit(3)
    //             .lean()
    //
    //         const newestLikes = likesFromDb.map(item => {
    //             return {
    //                 addedAt: item.addedAt,
    //                 userId: item.userId,
    //                 login: item.login
    //             }
    //         })
    //
    //         return {
    //             id: item.id,
    //             title: item.title,
    //             shortDescription: item.shortDescription,
    //             content: item.content,
    //             blogId: item.blogId,
    //             blogName: item.blogName,
    //             createdAt: item.createdAt,
    //             extendedLikesInfo: {
    //                 likesCount: likes.length ?? 0,
    //                 dislikesCount: dislikes.length ?? 0,
    //                 myStatus: status ?? "None",
    //                 newestLikes : newestLikes
    //             }
    //         };
    //     }));
    //
    //     return mappedItems
    // }
}