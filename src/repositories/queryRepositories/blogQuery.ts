import {blogMapper} from "../maper";
import {BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {client} from "../../db/db";
import {dbBlogCollections} from "../dbCollections";

export const blogQuery = {
    async getAllBlogInDb() {
        try {
            const blogs = await dbBlogCollections.find({}).toArray()
            return blogs.map(blogMapper)
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