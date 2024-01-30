import {client} from "./db";
import {
    BlackListOfTokenType,
    BlogViewModelType, commentsDBType,
    CommentViewModelType, DeviceDBType,
    PostViewModelType,
    userDBType,
    UserViewModel
} from "../types/commonBlogTypeAndPosts.types";

export const dbBlogCollections = client.db('Blogs').collection<BlogViewModelType>('blogs')
export const dbPostCollections = client.db('Posts').collection<PostViewModelType>('posts')
export const dbUsersCollections = client.db('Users').collection<userDBType>('users')
export const dbCommentsCollections = client.db('Comments').collection<commentsDBType>('comments')
export const dbBlacklistCollections = client.db('BlackListOfToken').collection<BlackListOfTokenType>('blackListOfToken')
export const dbDeviceCollections = client.db('Device').collection<DeviceDBType>('device')
