import {postMapper} from "../maper";

import {client} from "../../db/db";
import {PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {dbBlogCollections, dbPostCollections} from "../dbCollections";
import {QueryBlogInputModel} from "../../types/posts/queryPosts.types";


export const postQuery = {
    async getAllPostsFromDb (sortData: QueryBlogInputModel) {

        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        const filterForSort = (sortBy: string, sortDirection: string ): {[key: string]: 1 | -1} => {
            if (sortDirection === 'asc') {
                return {[sortBy]: 1}
            } else {
                return {[sortBy]: -1 }
            }
        }


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
}