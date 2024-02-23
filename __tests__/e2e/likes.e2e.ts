import {url} from "../../src/db/db";
import {app} from "../../src/app";
import mongoose from "mongoose";
import request = require('supertest')
import {BlogInputModelType, PostInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {createBlogManager} from "../utils/createBlogManager";
import {createPostForBlogManager} from "../utils/createPostForBlogManager";

describe('/likes',() => {
    beforeEach(async () => {
        await mongoose.connect(url)
        await request(app).delete('/api/testing/all-data')
    })

    it('Get posts with likes ', async () => {


        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://www.gohome.com"
        }

        const {createdBlog} =  await createBlogManager.createBlog(data, 201)

        const newPost: PostInputModelType = {
            title: "Home",
            shortDescription: "a wanna go home",
            content: 'Trrololo',
            blogId: createdBlog.id
        }
        const {createdPostForBlog} = await createPostForBlogManager.createPostForBlog(newPost, createdBlog, 201)

        console.log(createdPostForBlog)
    })

    afterAll(async () => {
        await mongoose.connection.close()
    })
})