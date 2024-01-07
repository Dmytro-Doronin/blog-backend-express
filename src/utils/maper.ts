import {WithId} from "mongodb";
import {BlogViewModelType, PostViewModelType, userDBType, UserViewModel} from "../types/commonBlogTypeAndPosts.types";

export const blogMapper = (blog: WithId<BlogViewModelType>): BlogViewModelType  => {
    return {
        id:	blog.id,
        name: blog.name,
        description: blog.description,
        websiteUrl:	blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}

export const postMapper = (post: WithId<PostViewModelType>): PostViewModelType  => {
    return {
        id:	post.id,
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}

export const userMapper = (user: WithId<userDBType>): UserViewModel  => {
    return {
        id:	user.id,
        login: user.userNAme,
        email: user.email,
        createdAt: user.createdAt
    }
}