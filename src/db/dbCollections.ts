import {client} from "./db";
import {
    BlackListOfTokenType,
    BlogViewModelType, commentsDBType,
    CommentViewModelType, DeviceDBType,
    PostViewModelType,
    userDBType,
    UserViewModel
} from "../types/commonBlogTypeAndPosts.types";

// export const dbBlogCollections = client.db('Blog').collection<BlogViewModelType>('blogs')
// export const dbPostCollections = client.db('Blog').collection<PostViewModelType>('posts')
// export const dbUsersCollections = client.db('Blog').collection<userDBType>('users')
// export const dbCommentsCollections = client.db('Blog').collection<commentsDBType>('comments')
// export const dbBlacklistCollections = client.db('Blog').collection<BlackListOfTokenType>('blackListOfToken')
// export const dbDeviceCollections = client.db('Blog').collection<DeviceDBType>('device')
// export const dbRateLimitCollections = client.db('Blog').collection<{IP:any, URL: any, date: Date}>('rate')

//Posts Users Comments BlackListOfToken Device Rate