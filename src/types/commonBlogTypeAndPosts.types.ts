import {Request, Response} from "express";


export type BlogViewModelType = {
    id:	string
    name: string
    description: string
    websiteUrl:	string
    createdAt: string
    isMembership: boolean
}

export type PostViewModelType = {
    id:	string
    title: string
    shortDescription: string
    content: string
    blogId:	string
    blogName: string
    createdAt: string
}

export type UserViewModel = {
    id: string
    login: string
    email: string
    createdAt: string
}

export type userDBType = {
    id: string
    accountData: {
        login: string
        email: string
        passwordHash: string
        passwordSalt: string
        createdAt: string
    }
    emailConfirmation: {
        confirmationCode: string
        expirationDate: Date
        isConfirmed: boolean
    },
    passwordRecovery: {
        passwordRecoveryCode: string
        expirationDate: Date
    }
}

export type DeviceDBType = {
    lastActiveDate: Date
    expireDate: Date
    deviceId: string
    ip: string
    title: string
    userId: string
}

export type DeviceResponse = {
    ip: string,
    title: string,
    lastActiveDate: Date,
    deviceId: string
}

export type BlackListOfTokenType = {
    token: string
}

type CommentatorInfoType = {
    userId:	string
    userLogin:	string
}

export type CommentViewModelType = {
    id: string
    content: string
    commentatorInfo: CommentatorInfoType
    createdAt: string
    "likesInfo": {
        "likesCount": number,
        "dislikesCount": number,
        "myStatus": "None" | "Like" | "Dislike"
    }
}

// type userForComments = {userId: string}

export type commentsDBType = {
    id: string
    postId: string
    content: string
    commentatorInfo: CommentatorInfoType
    createdAt: string
}

export type likeStatusType = 'Like' | 'Dislike' | 'None'

type newestLikesType = {
    addedAt: string,
    userId: string,
    login: string,
}

export type LikesType = {
    id: string,
    userId: string,
    targetId: string,
    target: string
    newestPostLikes: newestLikesType[]
    type: likeStatusType ,
}

// export type commentsDBType = CommentViewModelType & {postId: string}

export type BlogInputModelType = Omit<BlogViewModelType, 'id' | 'createdAt' | 'isMembership'>
export type PostInputModelType = Omit<PostViewModelType, 'id' | 'blogName' | 'createdAt'>
export type CreatePostToBlogType = Omit<PostViewModelType, 'id' | 'blogName' | 'createdAt' | 'blogId'>
export type UsersInputModelType = {
    login: string
    password: string
    email: string
}
export type RegistrationConfirmationInputType = {
    code: string
}

export type NewPasswordType = {
    newPassword: string
    recoveryCode: string
}

export type AuthEmail = {
    email: string
}

export type CommentInputModelType = {
    content: string
}

export type LoginType = {
    loginOrEmail: string
    password: string
}

export type BlogOutputModelType = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: BlogViewModelType[]
}

export type PostsOutputModelType = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: PostViewModelType[]
}
export type UsersOutputModelType = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: UserViewModel[]
}

export type CommentsOutputModelType = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: CommentViewModelType[]
}

export type CommentsPaginationDbModelType = {
    pagesCount?: number
    page?: number
    pageSize?: number
    totalCount?: number
    items: commentsDBType[]
}

export type FieldErrorType = {
    message: string,
    field: string
}

export type ApiErrorResult = {
    errorsMessages: FieldErrorType[]
}

export type LikeStatusType = {
    likeStatus: "None" | "Like" | "Dislike"
}

export type ParamsType = {id: string}
export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>
export type RequestWithParamsAndQuery<P,Q> = Request<P, {}, {}, Q>
export type ResponseWithData<D> = Response<D>