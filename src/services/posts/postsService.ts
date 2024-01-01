import {PostInputModelType, PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {postMutation} from "../../repositories/mutationRepositories/postMutation";
import {CreatePostsServiceType} from "../serviceTypes/postsTypes";
import {blogQuery} from "../../repositories/queryRepositories/blogQuery";
const { v4: uuidv4 } = require('uuid');

export const postsService = {
    async createPostService ({title, shortDescription, content, blogId}: PostInputModelType) {

        const blog = await blogQuery.getBlogByIdInDb(blogId)

        if (!blog) {
            return null
        }

        const newPost: PostViewModelType = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId,
            createdAt: (new Date().toISOString()),
            blogName: blog.name
        }

       return await postMutation.createPostInDb(newPost)
    },

    async changePostByIdService ({id, title, shortDescription, content, blogId}: CreatePostsServiceType) {
        return await postMutation.changePostByIdInDb({id, title, shortDescription, content, blogId})
    },

    async deletePostByIdService (id: string) {
        return await postMutation.deletePostByIdInDb(id)
    }
}