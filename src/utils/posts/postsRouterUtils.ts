import {blogDB, client} from "../../db/db";
import {
    BlogInputModelType,
    BlogViewModelType,
    PostInputModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {dbBlogCollections} from "../blogs/blogRouterUtils";

const { v4: uuidv4 } = require('uuid');

export const dbPostCollections = client.db('Blogs').collection('posts')

export const postsRouterUtils = {
    async getAllPosts () {
        try {
            return await dbPostCollections.find({}).toArray()
        } catch (e) {
            throw new Error('Posts was not get')
        }

    },

    async createPost ({title, shortDescription, content, blogId}: PostInputModelType) {

        try {
            const newPost: PostViewModelType = {
                id: uuidv4(),
                title,
                shortDescription,
                content,
                blogId,
                createdAt: (new Date().toISOString()),
                blogName: ''
            }

            const result = await dbPostCollections.insertOne(newPost)

            return await dbPostCollections.findOne({id: newPost.id})
        } catch (e) {
            throw new Error('Post was not add')
        }

    },

    async getPostById (id: string) {
        try {
            return await dbPostCollections.findOne({id: id})
        } catch (e) {
            throw new Error('Blog was not found')
        }

    },

    async changePostById ({id, title, shortDescription, content, blogId}: Omit<PostViewModelType, "blogName" | "createdAt">) {

        // const foundPost = blogDB.posts.find(item => item.id === id)
        //
        // if (foundPost === undefined) {
        //     return null
        // }
        //
        // const changedUser = {
        //     ...foundPost,
        //     title,
        //     shortDescription,
        //     content,
        //     blogId
        // }
        //
        // const indexFoundBlog = blogDB.posts.findIndex(item => item.id === foundPost.id)
        //
        // blogDB.posts.splice(indexFoundBlog, 1, changedUser)
        //
        // return true
        try {
            const addedItem = await dbPostCollections.findOne({id: id})

            if (!addedItem) {
                return null
            }

            await dbPostCollections.updateOne(
                {id: addedItem.id},
                {
                    $set: {title, shortDescription, content,blogId }
                }
            )

            return true
        } catch (e) {
            throw new Error('Blog was not changed by id')
        }

    },

    async deletePostById (id: string) {
        // const foundPost = blogDB.posts.find(item => item.id === id)
        //
        // if (foundPost === undefined) {
        //     return null
        // }
        //
        // const indexFoundPost = blogDB.posts.findIndex(item => item.id === foundPost.id)
        //
        // blogDB.posts.splice(indexFoundPost, 1)
        //
        // return true

        try {
            const res = await dbPostCollections.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
            return null

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }
}