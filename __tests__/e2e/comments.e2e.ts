import {app} from "../../src/app";
import request = require('supertest')
import {createUserManager} from "../utils/createUserManager";
import {BlogInputModelType, UsersInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createCommentManager} from "../utils/createCommentManager";
import {createBlogManager} from "../utils/createBlogManager";
import {createPostManager} from "../utils/createPostManager";

describe('/comment', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })


    it('Create comment for post', async () => {

        const user: UsersInputModelType = {
            login: "Dmytro",
            password: "a wanna go home",
            email: "asdasd@gmail.com"
        }
        const {createdUser} = await createUserManager.createUser(user, 201)

        const loginResponse = await request(app)
            .post('/api/auth/login')
            .send({
                loginOrEmail: createdUser.login,
                password: createdUser.password
            })
            .expect(200)

        const blog: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://www.gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(blog, 201)

        const {createdPost} = await createPostManager.createPost(createdBlog, 201)

        const content = {
            content: "stringstringstringst"
        }

        await createCommentManager.createComment(content, createdPost.id, loginResponse.body.accessToken, 201)
    }, 150000)

    afterAll(done => {
        done()
    })

})