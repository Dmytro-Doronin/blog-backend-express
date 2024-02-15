import {commentMapper, postMapper} from "../../utils/mapper";

import {client} from "../../db/db";
import {PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {QueryCommentsInputModel, QueryPostInputModel} from "../../types/posts/queryPosts.types";
import {filterForSort} from "../../utils/sortUtils";
import {CommentModel, PostModel} from "../../db/schemes";


export const postQuery = {
    async getAllPostsFromDb (sortData: QueryPostInputModel) {

        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        try {
            const post = await PostModel
                .find({})
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .lean()

            const totalCount = await PostModel.countDocuments({})

            const pagesCount = Math.ceil(totalCount / +pageSize)
            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount,
                items: post.map(postMapper)
            }
        } catch (e) {
            throw new Error('Posts was not get')
        }
    },

    async getPostByIdFromDb (id: string) {
        try {
            const result = await PostModel.findOne({id: id})

            if (!result) {
                return null
            }
            return postMapper(result)
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },

    // async getAllCommentsForPostFromDb (id: string, sortData: QueryCommentsInputModel, userId: string) {
    //
    //     const sortBy = sortData.sortBy ?? 'createdAt'
    //     const sortDirection = sortData.sortDirection ?? 'desc'
    //     const pageNumber = sortData.pageNumber ?? 1
    //     const pageSize = sortData.pageSize ?? 10
    //
    //
    //     try {
    //         const comment = await CommentModel
    //             .find({postId: id})
    //             .sort(filterForSort(sortBy, sortDirection))
    //             .skip((+pageNumber - 1) * +pageSize)
    //             .limit(+pageSize)
    //             .lean()
    //
    //         const totalCount = await CommentModel.countDocuments({postId: id})
    //
    //         const pagesCount = Math.ceil(totalCount / +pageSize)
    //
    //         return {
    //             pagesCount,
    //             page: +pageNumber,
    //             pageSize: +pageSize,
    //             totalCount,
    //             items: comment.map(commentMapper)
    //         }
    //
    //
    //     } catch (e) {
    //         throw new Error('Comments was not get')
    //     }
    //
    //     // try {
    //     //     let comment
    //     //     if (!userId) {
    //     //          comment = await CommentModel
    //     //             .find({postId: id})
    //     //             .sort(filterForSort(sortBy, sortDirection))
    //     //             .skip((+pageNumber - 1) * +pageSize)
    //     //             .limit(+pageSize)
    //     //             .lean()
    //     //     } else {
    //     //          comment = await CommentModel.aggregate([
    //     //             {
    //     //                 $match: {postId: id}
    //     //             },
    //     //             {
    //     //                 $sort: filterForSort(sortBy, sortDirection)
    //     //             },
    //     //             {
    //     //                 $skip: (+pageNumber - 1) * +pageSize
    //     //             },
    //     //             {
    //     //                 $limit: +pageSize
    //     //             },
    //     //             {
    //     //                 $project: {
    //     //                     id: 1,
    //     //                     content: 1,
    //     //                     commentatorInfo: 1,
    //     //                     createdAt: 1,
    //     //                     likesInfo: {
    //     //                         likesCount: 1,
    //     //                         dislikesCount: 1,
    //     //                         myStatus: {
    //     //                             $cond: [
    //     //                                 {
    //     //                                     $in: [userId, '$likesInfo.likedBy']
    //     //                                 },
    //     //                                 'Like',
    //     //                                 {
    //     //                                     $cond: [
    //     //                                         {
    //     //                                             $in: [userId, '$likesInfo.dislikedBy']
    //     //                                         },
    //     //                                         'Dislike',
    //     //                                     ]
    //     //                                 },
    //     //                                 'None'
    //     //                             ]
    //     //                         }
    //     //                     }
    //     //                 }
    //     //             }
    //     //         ])
    //     //     }
    //
    // }
}