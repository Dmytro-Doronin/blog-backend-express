import {commentMapper, postMapper} from "../../utils/maper";

import {client} from "../../db/db";
import {PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {dbBlogCollections, dbCommentsCollections, dbPostCollections} from "../../db/dbCollections";
import {QueryCommentsInputModel, QueryPostInputModel} from "../../types/posts/queryPosts.types";
import {filterForSort} from "../../utils/sortUtils";


export const postQuery = {
    async getAllPostsFromDb (sortData: QueryPostInputModel) {

        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        try {
            const post = await dbPostCollections
                .find({})
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .toArray()

            const totalCount = await dbPostCollections.countDocuments({})

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
            const result = await dbPostCollections.findOne({id: id})

            if (!result) {
                return null
            }

            return postMapper(result)
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },

    async getAllCommentsForPostFromDb (id: string, sortData: QueryCommentsInputModel ) {

        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        try {

            const comment = await dbCommentsCollections
                .find({postId: id})
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .toArray()

            const totalCount = await dbCommentsCollections.countDocuments({postId: id})

            const pagesCount = Math.ceil(totalCount / +pageSize)

            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount,
                items: comment.map(commentMapper)
            }

        } catch (e) {
            throw new Error('Comments was not get')
        }

    }
}