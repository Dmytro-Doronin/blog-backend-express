import {WithId} from "mongodb";
import {
    BlogViewModelType,
    commentsDBType, CommentViewModelType,
    PostViewModelType,
    userDBType,
    UserViewModel
} from "../types/commonBlogTypeAndPosts.types";

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
        login: user.accountData.login,
        email: user.accountData.email,
        createdAt: user.accountData.createdAt
    }
}

export const commentMapper = (comment: WithId<commentsDBType>): CommentViewModelType  => {
    return {
        id:	comment.id,
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt
    }
}