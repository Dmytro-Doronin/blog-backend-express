import {app} from "../../src/app";
import request = require('supertest')
import {createUserManager} from "../utils/createUserManager";
import {
    BlogInputModelType,
    PostInputModelType,
    UsersInputModelType
} from "../../src/types/commonBlogTypeAndPosts.types";
import {createCommentManager} from "../utils/createCommentManager";
import {createBlogManager} from "../utils/createBlogManager";
import {createPostManager} from "../utils/createPostManager";

describe('/comment', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    }, 10000)


    it('Create comment for post', async () => {

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
        const content = {
            content: "stringstringstringst"
        }
        //

        await createCommentManager.createComment(content, createdPost.id, responseToken.body.accessToken, 201)
    }, 15000)

    afterAll(done => {
        done()
    })

})