import {PostViewModelType} from "../../types/commonBlogTypeAndPosts.types";

export type CreatePostsServiceType = Omit<PostViewModelType, "blogName" | "createdAt">