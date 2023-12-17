import {BlogInputModelType, BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {blogMapper} from "../maper";

import {client} from "../../db/db";
import {ChangeBlogByIdTypes} from "../../services/serviceTypes/blogsTypes";
import {dbBlogCollections} from "../dbCollections";
const { v4: uuidv4 } = require('uuid');




export const blogMutation = {
    async createBlogInDb (newBlog : BlogViewModelType) {

        try {

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

    async changeBlogByIdInDb ({id ,name, description, websiteUrl}: ChangeBlogByIdTypes) {


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

    async deleteBlogByIdInDb (id: string) {

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