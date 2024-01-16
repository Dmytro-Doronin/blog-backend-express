import {
    BlogInputModelType,
    PostInputModelType,
    UsersInputModelType
} from "../../src/types/commonBlogTypeAndPosts.types";
import {createUserManager} from "./createUserManager";
import {app} from "../../src/app";
import {createBlogManager} from "./createBlogManager";
import {createPostManager} from "./createPostManager";
import request = require('supertest')

export const createUserPostAndBlogManager = {
    async createAllEntities () {
        const user: UsersInputModelType = {
            login: "Dmytro",
            password: "a wanna go home",
            email: "asdasd@gmail.com"
        }
        await createUserManager.createUser(user, 201)

        const loginData = {
            loginOrEmail: "Dmytro",
            password: "a wanna go home",
        }

        const responseToken = await request(app)
            .post('/api/auth/login')
            .send(loginData)
            .expect(200)


        const blog: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://www.gohome.com"
        }
        //
        const {createdBlog} = await createBlogManager.createBlog(blog, 201)
        //

        const post: PostInputModelType = {
            title: 'New post',
            shortDescription: 'Africa',
            content: 'Lalala',
            blogId: createdBlog.id
        }

        const {createdPost} = await createPostManager.createPost(post, 201)
        //

        return {createdPost, responseToken}
    }
}