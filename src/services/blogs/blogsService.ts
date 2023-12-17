import {BlogInputModelType, BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {blogMutation} from "../../repositories/mutationRepositories/blogMutation";
import {ChangeBlogByIdTypes} from "../serviceTypes/blogsTypes";
const { v4: uuidv4 } = require('uuid');


export const blogsService = {
    async createBlogService ({name, description, websiteUrl}: BlogInputModelType) {

        const newBlog: BlogViewModelType = {
            id: uuidv4(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogMutation.createBlogInDb(newBlog)

    },

    async changeBlogByIdService ({id ,name, description, websiteUrl}: ChangeBlogByIdTypes) {
        return await blogMutation.changeBlogByIdInDb({id ,name, description, websiteUrl})
    },

    async deleteBlogByIdService(id: string) {
        return await blogMutation.deleteBlogByIdInDb(id)
    }
}