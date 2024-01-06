import {app} from "../../src/app";
import request = require('supertest')
import {BlogInputModelType, PostInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createBlogManager} from "../utils/createBlogManager";
import {createPostManager} from "../utils/createPostManager";
describe('/blogs', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })

    it ('Should create and add post to the db', async () => {

        const data: PostInputModelType = {
            title: "Home",
            shortDescription: "a wanna go home",
            content: 'Trrololo',
            blogId: "1"
        }

        await createPostManager.createPost(data, 201)

    })
})