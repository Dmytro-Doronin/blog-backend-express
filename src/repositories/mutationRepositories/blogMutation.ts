import {
    BlogViewModelType, PostDbModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";

import {ChangeBlogByIdTypes} from "../../services/serviceTypes/blogsTypes";

import {BlogModel, PostModel} from "../../db/schemes";
const { v4: uuidv4 } = require('uuid');
import {injectable} from "inversify";


@injectable()
export class BlogMutation  {
    async createBlogInDb (newBlog : BlogViewModelType) {
        try {
            await BlogModel.create(newBlog)
            const result = await BlogModel.findOne({id: newBlog.id}).lean()

            if (!result) {
                return null
            }

            return result
        } catch (e) {
            throw new Error('Blog was not created')
        }

    }

    async createPostToBlogInDb (post: PostDbModelType) {

        try {
            await PostModel.create(post)
            const postFromDb = await PostModel.findOne({id: post.id}).lean()

            if (!postFromDb) {
                return null
            }
            return postFromDb
        } catch (e) {
            throw new Error('Blog was not created')
        }

    }

    async changeBlogByIdInDb ({id ,name, description, websiteUrl}: ChangeBlogByIdTypes) {


        try {
            const addedItem = await BlogModel.findOne({id: id}).lean()

            if (!addedItem) {
                return null
            }

           const result = await BlogModel.updateOne(
                {id: id},
                {
                    $set: {name, description, websiteUrl}
                }
            )

            return result.modifiedCount === 1
        } catch (e) {
            throw new Error('Blog was not changed by id')
        }
    }

    async deleteBlogByIdInDb (id: string) {

        try {
            const res = await BlogModel.deleteOne({id: id})

            return res.deletedCount === 1

        } catch (e) {
            throw new Error('Blog was nod deleted')
        }
    }

    async getBlogByIdInDb (id: string): Promise<BlogViewModelType | null>  {

        try {
            const blog = await BlogModel.findOne({id: id}).lean()
            if (!blog) {
                return null
            }
            return blog
        } catch (e) {
            throw new Error('Blog was not found')
        }

    }
}