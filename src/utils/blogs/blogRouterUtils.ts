import {BlogInputModelType, BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {client} from "../../db/db";
import {blogMapper} from "../maper";

const { v4: uuidv4 } = require('uuid');

export const dbBlogCollections = client.db('Blogs').collection<BlogViewModelType>('blogs')

export const blogRouterUtils = {

    async getAllBlog() {
        try {
            const blogs = await dbBlogCollections.find({}).toArray()
            return blogs.map(blogMapper)
        } catch (e) {
            throw new Error('Does not get all blogs')
        }

    },

    async createBlog ({name, description, websiteUrl}: BlogInputModelType) {



        try {
            const newBlog: BlogViewModelType = {
                id: uuidv4(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            }


            await dbBlogCollections.insertOne(newBlog)
            const result = await dbBlogCollections.findOne({id: newBlog.id})

            if (!result) {
                return null
            }

            return blogMapper(result)
        } catch (e) {
            throw new Error('Blog was not created')
        }

    },

    async getBlogById (id: string): Promise<BlogViewModelType | null>  {

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

    async changeBlogById ({id ,name, description, websiteUrl}: (BlogInputModelType & {id: string})) {


        try {
            const addedItem = await dbBlogCollections.findOne({id: id})

            if (!addedItem) {
                return null
            }

            await dbBlogCollections.updateOne(
                {id: id},
                {
                    $set: {name, description, websiteUrl}
                }
            )

            return true
        } catch (e) {
            throw new Error('Blog was not changed by id')
        }


    },

    async deleteBlogById (id: string) {

        try {
            const res = await dbBlogCollections.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
             return null

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }
}