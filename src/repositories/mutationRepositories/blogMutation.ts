import {
    BlogInputModelType,
    BlogViewModelType,
    CreatePostToBlogType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {blogMapper, postMapper} from "../../utils/mapper";

import {client} from "../../db/db";
import {ChangeBlogByIdTypes} from "../../services/serviceTypes/blogsTypes";
// import {dbPostCollections} from "../../db/dbCollections";
import {blogQuery} from "../queryRepositories/blogQuery";
import {BlogModel, PostModel} from "../../db/schemes";
const { v4: uuidv4 } = require('uuid');



export const blogMutation = {
    async createBlogInDb (newBlog : BlogViewModelType) {
        try {
            debugger
            await BlogModel.create(newBlog)
            const result = await BlogModel.findOne({id: newBlog.id}).lean()
            debugger

            if (!result) {
                return null
            }

            return blogMapper(result)
        } catch (e) {
            throw new Error('Blog was not created')
        }

    },

    async createPostToBlogInDb (post: PostViewModelType) {

        try {
            await PostModel.create(post)
            const postFromDb = await PostModel.findOne({id: post.id}).lean()

            if (!postFromDb) {
                return null
            }

            return postMapper(postFromDb)

        } catch (e) {
            throw new Error('Blog was not created')
        }

    },

    async changeBlogByIdInDb ({id ,name, description, websiteUrl}: ChangeBlogByIdTypes) {


        try {
            const addedItem = await BlogModel.findOne({id: id}).lean()

            if (!addedItem) {
                return null
            }

            await BlogModel.updateOne(
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

    async deleteBlogByIdInDb (id: string) {

        try {
            const res = await BlogModel.deleteOne({id: id})

            if (res.deletedCount === 1) {
                return true
            }
            return null

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }
}