import {
    BlogInputModelType,
    BlogViewModelType,
    CreatePostToBlogType,
    ParamsType, PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {blogMutation} from "../../repositories/mutationRepositories/blogMutation";
import {ChangeBlogByIdTypes} from "../serviceTypes/blogsTypes";
import {blogQuery} from "../../repositories/queryRepositories/blogQuery";
import {postQuery} from "../../repositories/queryRepositories/postQuery";
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
    },

    async createPostToBlogService({id}: ParamsType, {title, shortDescription, content}: CreatePostToBlogType ) {
        const blog = await blogQuery.getBlogByIdInDb(id)

        if (!blog) {
            return null
        }

        const newPost: PostViewModelType = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId: blog.id,
            createdAt: (new Date().toISOString()),
            blogName: blog.name
        }

        return await blogMutation.createPostToBlogInDb(newPost)

    }
}