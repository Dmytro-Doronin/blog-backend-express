import {client} from "../../db/db";
import {
    BlogInputModelType,
    BlogViewModelType,
    PostInputModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {dbBlogCollections} from "../blogs/blogRouterUtils";
import {postMapper} from "../maper";
import {ObjectId} from "mongodb";
const { v4: uuidv4 } = require('uuid');

export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')

export const postsRouterUtils = {
    async getAllPosts () {
        try {
            const post = await dbPostCollections.find({}).toArray()
            return post.map(postMapper)
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

             await dbPostCollections.insertOne({
                id: newPost.id,
                title: newPost.title,
                shortDescription: newPost.shortDescription,
                content: newPost.content,
                blogId: newPost.blogId,
                createdAt: newPost.createdAt,
                blogName: newPost.blogName
            })
            const result = await dbPostCollections.findOne({id: newPost.id})

            if (!result) {
                return null
            }

            return postMapper(result)
        } catch (e) {
            throw new Error('Post was not add')
        }

    },

    async getPostById (id: string) {
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

            const result = await dbPostCollections.updateOne(
                {id: id},
                {
                    $set: {title, shortDescription, content, blogId }
                }
            )

            return !!result.matchedCount
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