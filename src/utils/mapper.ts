import {WithId} from "mongodb";
import {
    BlogViewModelType,
    commentsDBType, CommentViewModelType, DeviceDBType, DeviceResponse,
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

export const commentMapper = (value: WithId<commentsDBType> | any): CommentViewModelType  => {
    return {
        id:	value.id,
        content: value.content,
        commentatorInfo: {
            userId: value.commentatorInfo.userId,
            userLogin: value.commentatorInfo.userLogin
        },
        createdAt: value.createdAt,
        likesInfo: {
            likesCount: value.likesInfo.likesCount,
            dislikesCount: value.likesInfo.dislikesCount,
            myStatus: value.likesInfo.myStatus
        }
    }
}

export const deviceMapper = (device: WithId<DeviceDBType>): DeviceResponse => {
    return {
        ip: device.ip,
        title: device.title,
        lastActiveDate: device.lastActiveDate,
        deviceId: device.deviceId
    }
}