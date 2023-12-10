import {BlogInputModelType, BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {client} from "../../db/db";

const { v4: uuidv4 } = require('uuid');

export const dbBlogCollections = client.db('Blogs').collection('blogs')

export const blogRouterUtils = {

    async getAllBlog() {
        try {
            return await dbBlogCollections.find({}).toArray()
        } catch (e) {
            throw new Error('Does not get all blogs')
        }

    },

    async createBlog ({name, description, websiteUrl}: BlogInputModelType) {

        const newBlog: BlogViewModelType = {
            id: uuidv4(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: true
        }

        try {
            const result = await dbBlogCollections.insertOne(newBlog)

            return await dbBlogCollections.findOne({id: newBlog.id})
        } catch (e) {
            throw new Error('Blog was not add')
        }

    },

    async getBlogById (id: string) {

        try {
            return await dbBlogCollections.findOne({id: id})
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
                {id: addedItem.id},
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