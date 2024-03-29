import mongoose from "mongoose";
import { WithId } from 'mongodb'
import {
    BlackListOfTokenType,
    BlogViewModelType,
    commentsDBType, DeviceDBType, LikesType, PostDbModelType,
    PostViewModelType,
    userDBType
} from "../types/commonBlogTypeAndPosts.types";
export const BlogScheme = new mongoose.Schema<WithId<BlogViewModelType>>({
    id: {type: String, required: true },
    name: {type: String, required: true },
    description: {type: String, required: true },
    websiteUrl: {type: String, required: true },
    createdAt: {type: String, required: true },
    isMembership: {type: Boolean, required: true }
})

export const PostSchema = new mongoose.Schema<WithId<PostDbModelType>>({
    id:	{type: String, required: true},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId:	{type: String, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: String, required: true},
})

export const UserSchema = new mongoose.Schema<WithId<userDBType>>(
    {
        id: {type: String, required: true},
        accountData: {
            login: {type: String, required: true},
            email: {type: String, required: true},
            passwordHash: {type: String, required: true},
            passwordSalt: {type: String, required: true},
            createdAt: {type: String, required: true},
        },
        emailConfirmation: {
            confirmationCode: {type: String, required: true} ,
            expirationDate: {type: Date,  required: true},
            isConfirmed: {type: Boolean, required: true}
        },
        passwordRecovery: {
            passwordRecoveryCode: {type: String, required: true},
            expirationDate: {type: Date,  required: true},
        }
    })

export const CommentSchema = new mongoose.Schema<WithId<commentsDBType>>({
    id: {type: String, required: true},
    postId: {type: String, required: true},
    content: {type: String, required: true},
    commentatorInfo: {
        userId: { type: String, required: true},
        userLogin: { type: String,required: true },
    },
    createdAt: {type: String, required: true},
})
export const LikeSchema = new mongoose.Schema<WithId<LikesType>>({
    id: { type: String, required: true },
    userId: { type: String, ref: 'User', required: true },
    login: { type: String, required: true },
    targetId: { type: String, required: true },
    target: { type: String, enum: ['Comment', 'Post'], required: true },
    addedAt: { type: String, required: true, default: (new Date().toISOString()) },
    type: { type: String, enum: ['Like', 'Dislike', 'None'], required: true },
});

export const BlackListSchema = new mongoose.Schema<WithId<BlackListOfTokenType>>({
    token: {type: String, required: true}
})

export const DeviceSchema = new mongoose.Schema<WithId<DeviceDBType>>({
    lastActiveDate: {type: Date, required: true},
    expireDate: {type: Date, required: true},
    deviceId: {type: String, required: true},
    ip: {type: String, required: true},
    title: {type: String, required: true},
    userId: {type: String, required: true}
})

export const RateSchema = new mongoose.Schema<WithId<{IP:any, URL: any, date: Date}>>({
    IP: {type: String, required: true},
    URL: {type: String, required: true},
    date: {type: Date, required: true}
})

export const BlogModel = mongoose.model<WithId<BlogViewModelType>>('blogs', BlogScheme)
export const PostModel = mongoose.model<WithId<PostDbModelType>>('posts', PostSchema )
export const UserModel = mongoose.model<WithId<userDBType>>('users', UserSchema)
export const CommentModel = mongoose.model<WithId<commentsDBType>>('comments', CommentSchema)
export const BlackListModel = mongoose.model<WithId<BlackListOfTokenType>>('blackListOfToken', BlackListSchema)
export const DeviceModel = mongoose.model<WithId<DeviceDBType>>('device', DeviceSchema)
export const RateModel = mongoose.model<WithId<{IP:any, URL: any, date: Date}>>('rate', RateSchema)
export const LikeModel = mongoose.model<WithId<LikesType>>('likes', LikeSchema)



