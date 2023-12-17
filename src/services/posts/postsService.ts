import {PostInputModelType, PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {postMutation} from "../../repositories/mutationRepositories/postMutation";
import {CreatePostsServiceType} from "../serviceTypes/postsTypes";
const { v4: uuidv4 } = require('uuid');

export const postsService = {
    async createPostService ({title, shortDescription, content, blogId}: PostInputModelType) {
        const newPost: PostViewModelType = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId,
            createdAt: (new Date().toISOString()),
            blogName: ''
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