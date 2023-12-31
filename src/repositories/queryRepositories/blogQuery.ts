import {blogMapper} from "../maper";
import {BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {client} from "../../db/db";
import {dbBlogCollections} from "../dbCollections";
import {QueryBlogInputModel} from "../../types/blogs/queryBlog.types";

export const blogQuery = {
    async getAllBlogInDb(sortData: QueryBlogInputModel) {
        const searchNameTerm = sortData.searchNameTerm ?? null
        const sortBy = sortData.sortBy ?? 'createdAt'
        const sortDirection = sortData.sortDirection ?? 'desc'
        const pageNumber = sortData.pageNumber ?? 1
        const pageSize = sortData.pageSize ?? 10

        let filter = {}

        if (searchNameTerm) {
            filter = {
                name: {$regex: searchNameTerm, $options: 'i'}
            }
        }

        try {
            const blogs = await dbBlogCollections
                .find(filter)
                .sort(sortBy, sortDirection)
                .skip((+pageNumber - 1) * +pageSize)
                .limit(+pageSize)
                .toArray()

            const totalCount = await dbBlogCollections.countDocuments(filter)

            const pagesCount = Math.ceil(totalCount / +pageSize)


            return {
                pagesCount,
                page: pageNumber,
                pageSize,
                totalCount,
                items: blogs.map(blogMapper)
            }
        } catch (e) {
            throw new Error('Does not get all blogs')
        }

    },
    async getBlogByIdInDb (id: string): Promise<BlogViewModelType | null>  {

        try {
            const blog = await dbBlogCollections.findOne({id: id})
            if (!blog) {
                return null
            }
            return blogMapper(blog)
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },
}