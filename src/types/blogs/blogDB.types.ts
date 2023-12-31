import {BlogViewModelType, PostViewModelType} from "../commonBlogTypeAndPosts.types";


export type BlogDbType = {
    blogs: BlogViewModelType[],
    posts: PostViewModelType[]
}