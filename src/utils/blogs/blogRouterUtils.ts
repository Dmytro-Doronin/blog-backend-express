import {BlogInputModelType, BlogViewModelType} from "../../types/commonBlogTypeAndPosts.types";
import {blogDB} from "../../db/db";
const { v4: uuidv4 } = require('uuid');

export const blogRouterUtils = {

    getAllBlog() {

        const res = blogDB.blogs
        return res
    },

    createBlog ({name, description, websiteUrl}: BlogInputModelType) {

        const newBlog: BlogViewModelType = {
            id: uuidv4(),
            name,
            description,
            websiteUrl
        }

        blogDB.blogs.push(newBlog)

        const addedItem = blogDB.blogs.find(blog => blog.id === newBlog.id)

        return addedItem
    },

    getBlogById (id: string) {

        const result = blogDB.blogs.find(item => item.id === id)

        return result
    },

    changeBlogById ({id ,name, description, websiteUrl}: BlogViewModelType) {

        const foundBlog = blogDB.blogs.find(item => item.id === id)

        if (foundBlog === undefined) {
            return null
        }

        const changedUser = {
            ...foundBlog,
            name,
            description,
            websiteUrl
        }

        const indexFoundBlog = blogDB.blogs.findIndex(item => item.id === foundBlog.id)

        blogDB.blogs.splice(indexFoundBlog, 1, changedUser)

        return true

    },

    deleteBlogById (id: string) {
        const foundBlog = blogDB.blogs.find(item => item.id === id)

        if (foundBlog === undefined) {
            return null
        }

        const indexFoundBlog = blogDB.blogs.findIndex(item => item.id === foundBlog.id)

        blogDB.blogs.splice(indexFoundBlog, 1)

        return true
    }
}