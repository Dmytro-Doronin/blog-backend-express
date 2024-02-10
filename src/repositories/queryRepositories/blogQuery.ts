import {blogMapper, postMapper} from "../../utils/mapper";
import {BlogViewModelType, ParamsType} from "../../types/commonBlogTypeAndPosts.types";
import {client} from "../../db/db";
// import {dbBlogCollections, dbPostCollections} from "../../db/dbCollections";
import {QueryBlogInputModel} from "../../types/blogs/queryBlog.types";
import {filterForSort} from "../../utils/sortUtils";
import {BlogModel, PostModel} from "../../db/schemes";

export const blogQuery = {
    async getAllBlogInDb(sortData: QueryBlogInputModel) {
        const searchNameTerm = sortData.searchNameTerm ?? null
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection  = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10


        let filter = {}

        if (searchNameTerm) {
            filter = {
                name: {$regex: searchNameTerm, $options: 'i'}
            }
        }

        try {
            const blogs = await BlogModel
                .find(filter)
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .lean()

            const totalCount = await BlogModel.countDocuments(filter)

            const pagesCount = Math.ceil(totalCount / +pageSize)


            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount,
                items: blogs.map(blogMapper)
            }
        } catch (e) {
            throw new Error('Does not get all blogs')
        }

    },

    async getAllPostsInBlogFromDb (blogId: string ,sortData: QueryBlogInputModel) {

        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        try {
            const posts = await PostModel
                .find({blogId: blogId})
                .sort(filterForSort(sortBy, sortDirection))
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .lean()

            const totalCount = await PostModel.countDocuments({blogId: blogId})

            const pagesCount = Math.ceil(totalCount / +pageSize)

            return {
                pagesCount,
                page: +pageNumber,
                pageSize: +pageSize,
                totalCount,
                items: posts.map(postMapper)
            }
        } catch (e) {
            throw new Error('Posts was not get')
        }
    },

    async getBlogByIdInDb (id: string): Promise<BlogViewModelType | null>  {

        try {
            const blog = await BlogModel.findOne({id: id}).lean()
            if (!blog) {
                return null
            }
            return blogMapper(blog)
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },
}