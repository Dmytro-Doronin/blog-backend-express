import {blogDB} from "../../db/db";
import {
    BlogInputModelType,
    BlogViewModelType,
    PostInputModelType,
    PostViewModelType
} from "../../types/commonBlogTypeAndPosts.types";
const { v4: uuidv4 } = require('uuid');

export const postsRouterUtils = {
    getAllPosts () {
        const res = blogDB.posts
        return res
    },

    createPost ({title, shortDescription, content, blogId}: PostInputModelType) {

        const newPost: PostViewModelType = {
            id: uuidv4(),
            title,
            shortDescription,
            content,
            blogId,
            blogName: ''
        }

        blogDB.posts.push(newPost)

        const addedItem = blogDB.posts.find(post => post.id === newPost.id)

        return addedItem
    },

    getPostById (id: string) {

        const result = blogDB.posts.find(item => item.id === id)

        return result
    },

    changePostById ({id, title, shortDescription, content, blogId}: Omit<PostViewModelType, "blogName">) {

        const foundPost = blogDB.posts.find(item => item.id === id)

        if (foundPost === undefined) {
            return null
        }

        const changedUser = {
            ...foundPost,
            title,
            shortDescription,
            content,
            blogId
        }

        const indexFoundBlog = blogDB.posts.findIndex(item => item.id === foundPost.id)

        blogDB.posts.splice(indexFoundBlog, 1, changedUser)

        return true

    },

    deletePostById (id: string) {
        const foundPost = blogDB.posts.find(item => item.id === id)

        if (foundPost === undefined) {
            return null
        }

        const indexFoundPost = blogDB.posts.findIndex(item => item.id === foundPost.id)

        blogDB.posts.splice(indexFoundPost, 1)

        return true
    }
}