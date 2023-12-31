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

export type BlogInputModelType = Omit<BlogViewModelType, 'id' | 'createdAt' | 'isMembership'>
export type PostInputModelType = Omit<PostViewModelType, 'id' | 'blogName' | 'createdAt'>
export type CreatePostToBlogType = Omit<PostViewModelType, 'id' | 'blogName' | 'createdAt' | 'blogId'>

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


export type FieldErrorType = {
    message: string,
    field: string
}

export type ApiErrorResult = {
    errorsMessages: FieldErrorType[]
}


export type ParamsType = {id: string}
export type RequestWithParams<P> = Request<P, {}, {}, {}>
export type RequestWithBody<B> = Request<{}, {}, B, {}>
export type RequestWithQuery<Q> = Request<{}, {}, {}, Q>
export type RequestWithParamsAndBody<P,B> = Request<P, {}, B, {}>
export type RequestWithParamsAndQuery<P,Q> = Request<P, {}, {}, Q>
export type ResponseWithData<D> = Response<D>