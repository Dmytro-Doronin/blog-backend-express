import {PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";

export type CreatePostsServiceType = {
    id: string
    title: string,
    shortDescription: string,
    content: string,
    blogId: string
}