import {
    BlogInputModelType,
    BlogViewModelType,
    CreatePostToBlogType,
    ParamsType, PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
import {BlogMutation} from "../../repositories/mutationRepositories/blogMutation";
import {ChangeBlogByIdTypes} from "../serviceTypes/blogsTypes";
import {blogMapper, postMapper} from "../../utils/mapper";
const { v4: uuidv4 } = require('uuid');


export class BlogsService {

    constructor( protected blogMutation: BlogMutation) {}

    async createBlogService ({name, description, websiteUrl}: BlogInputModelType) {

        const newBlog: BlogViewModelType = {
            id: uuidv4(),
            name,
            description,
            websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        const blog = await this.blogMutation.createBlogInDb(newBlog)

        if (!blog) {
            return null
        }

        return blogMapper(blog)

    }

    async changeBlogByIdService ({id ,name, description, websiteUrl}: ChangeBlogByIdTypes) {
        return await this.blogMutation.changeBlogByIdInDb({id ,name, description, websiteUrl})
    }

    async deleteBlogByIdService(id: string) {
        return await this.blogMutation.deleteBlogByIdInDb(id)
    }

    async createPostToBlogService({id}: ParamsType, {title, shortDescription, content}: CreatePostToBlogType ) {
        const blog = await this.blogMutation.getBlogByIdInDb(id)

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

        const postFromDb = await this.blogMutation.createPostToBlogInDb(newPost)

        if (!postFromDb) {
            return null
        }
        return postMapper(postFromDb)

    }
}