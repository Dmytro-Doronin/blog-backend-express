import {client} from "./db";
import {BlogViewModelType, PostViewModelType, userDBType, UserViewModel} from "../types/commonBlogTypeAndPosts.types";

export const dbBlogCollections = client.db('Blogs').collection<BlogViewModelType>('blogs')
export const dbPostCollections = client.db('Blogs').collection<PostViewModelType>('posts')
export const dbUsersCollections = client.db('Users').collection<userDBType>('users')
