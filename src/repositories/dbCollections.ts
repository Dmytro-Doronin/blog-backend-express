import {client} from "../db/db";
import {BlogViewModelType, PostViewModelType} from "../types/commonBlogTypeAndPosts.types";

export const dbBlogCollections = client.db('Blogs').collection<BlogViewModelType>('blogs')
export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')
