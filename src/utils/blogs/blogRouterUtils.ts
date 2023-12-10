import {BlogInputModelType, BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {client} from "../../db/db";
import {ObjectId} from "mongodb";
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
            const newBlog = {
                id: uuidv4(),
                name,
                description,
                websiteUrl,
                createdAt: new Date().toISOString(),
                isMembership: false
            }


             await dbBlogCollections.insertOne({
                id: newBlog.id,
                name: newBlog.name,
                description: newBlog.description,
                websiteUrl: newBlog.websiteUrl,
                createdAt: newBlog.createdAt,
                isMembership: newBlog.isMembership
            })
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

        // const foundBlog = blogDB.blogs.find(item => item.id === id)
        //
        // if (foundBlog === undefined) {
        //     return null
        // }
        //
        // const changedUser = {
        //     ...foundBlog,
        //     name,
        //     description,
        //     websiteUrl
        // }
        //
        // const indexFoundBlog = blogDB.blogs.findIndex(item => item.id === foundBlog.id)
        //
        // blogDB.blogs.splice(indexFoundBlog, 1, changedUser)
        //
        // return true

    },

    async deleteBlogById (id: string) {
        // const foundBlog = blogDB.blogs.find(item => item.id === id)
        //
        // if (foundBlog === undefined) {
        //     return null
        // }
        //
        //
        //
        // const indexFoundBlog = blogDB.blogs.findIndex(item => item.id === foundBlog.id)
        //
        // blogDB.blogs.splice(indexFoundBlog, 1)
        //
        // return true

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