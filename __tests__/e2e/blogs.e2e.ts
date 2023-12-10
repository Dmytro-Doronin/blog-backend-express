import request = require('supertest')
import {app} from "../../src/app";
import {createBlogManager} from "../utils/createBlogManager";
import {BlogInputModelType} from "../../src/types/commonBlogTypeAndPosts.types";
import {blogDB} from "../../src/db/db";

describe('/blogs', () => {

    beforeEach(async () => {
        await request(app).delete('/api/testing/all-data')
    })


    it ('Should create and add blog to the db', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://www.gohome.com"
        }

        await createBlogManager.createBlog(data, 201)

    })

    it ('Should not create blog with incorrect name', async () => {

        const data: BlogInputModelType = {
            name: "Home qscacaxcASDCSADFASDCVSCX VXZCVSADFWEDFWADCZXCsDFWFWEFWEF",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createResponse} = await createBlogManager.createBlog(data, 400)

        expect(createResponse.body).toEqual({
            errorsMessages: [
                {
                    message: 'The field must not be more then 15 symbols',
                    field: "name"
                }
            ]
        })
    })

    it ('Should not create blog with incorrect description', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem",
            websiteUrl: "https://gohome.com"
        }

        const {createResponse} = await createBlogManager.createBlog(data, 400)

        expect(createResponse.body).toEqual({
            errorsMessages: [
                {
                    message: 'The field must not be more then 500 symbols',
                    field: "description"
                }
            ]
        })
    })

    it ('Should not create blog with incorrect websiteUrl', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "troror"
        }

        const {createResponse} = await createBlogManager.createBlog(data, 400)

        expect(createResponse.body).toEqual({
            errorsMessages: [
                {
                    message: 'Incorrect websiteUrl',
                    field: "websiteUrl"
                }
            ]
        })
    })

    it ('Should get all blog', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)



        await request(app)
            .get(`/api/blogs`)
            .expect(200, [createdBlog])
    })

    it ('Should get blog by id', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)



        await request(app)
            .get(`/api/blogs/${createdBlog.id}`)
            .expect(200, createdBlog)
    })

    it ('Should not get blog by incorrect id', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)



        await request(app)
            .get(`/api/blogs/${createdBlog.id}`)
            .expect(200, createdBlog)
    })

    it ('Should change blog by id', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)


        const newDataForBlog =  {
            name: "Gyram",
            description: "DANELIA",
            websiteUrl: "https://89fWpaMJv0K3fVJctb7js9o_xTFvv-hhVzlazhaiqL21iib7VJX2S1S9J9.233cxd2PiubB58mWjOihm8dBbabqo8eK8"
        }

        await request(app)
            .put(`/api/blogs/${createdBlog.id}`)
            .send(newDataForBlog)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(204)

        // await request(app)
        //     .get(`/api/blogs/${createdBlog.id}`)
        //     .expect(200, createdBlog)
    })

    it ('Should not change blog by id with incorrect name', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)


        const newDataForBlog =  {
            name: "Gyrasdffadfsadff",
            description: "DANELIA",
            websiteUrl: "https://89fWpaMJv0K3fVJctb7js9o_xTFvv-hhVzlazhaiqL21iib7VJX2S1S9J9.233cxd2PiubB58mWjOihm8dBbabqo8eK8"
        }

        await request(app)
            .put(`/api/blogs/${createdBlog.id}`)
            .send(newDataForBlog)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(400, {
                errorsMessages: [
                    {
                        message: "The field must not be more then 15 symbols",
                        field: "name"
                    }
                ]
            })
    })

    it ('Should not change blog by id with incorrect description', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)


        const newDataForBlog =  {
            name: "Gyram",
            description: "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem" +
                "a wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorema wanna go home lorem",
            websiteUrl: "https://89fWpaMJv0K3fVJctb7js9o_xTFvv-hhVzlazhaiqL21iib7VJX2S1S9J9.233cxd2PiubB58mWjOihm8dBbabqo8eK8"
        }

        await request(app)
            .put(`/api/blogs/${createdBlog.id}`)
            .send(newDataForBlog)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(400, {
                errorsMessages: [
                    {
                        message: 'The field must not be more then 500 symbols',
                        field: "description"
                    }
                ]
            })

    })

    it ('Should not change blog by id with incorrect websiteUrl', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)


        const newDataForBlog =  {
            name: "Gyra",
            description: "DANELIA",
            websiteUrl: "https://89fWpaMJv0K3fVJctb7js9o_xTFvv-hhVzlazhaiqL21iib7VJX2S1S9J9.233cxd2PiubB58mWjOihm8dBbabqo8eK800"
        }

        await request(app)
            .put(`/api/blogs/${createdBlog.id}`)
            .send(newDataForBlog)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(400, {
                errorsMessages: [
                    {
                        message: "The field must not be more then 100 symbols",
                        field: "websiteUrl"
                    }
                ]
            })

    })

    it ('Should not change blog by id with incorrect websiteUrl pattern', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)


        const newDataForBlog =  {
            name: "Gyra",
            description: "DANELIA",
            websiteUrl: "la-la-la"
        }

        await request(app)
            .put(`/api/blogs/${createdBlog.id}`)
            .send(newDataForBlog)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(400, {
                errorsMessages: [
                    {
                        message: "Incorrect websiteUrl",
                        field: "websiteUrl"
                    }
                ]
            })

    })

    it ('Should not change blog by incorrect id', async () => {

        const newDataForBlog =  {
            name: "Gyra",
            description: "DANELIA",
            websiteUrl: "https://gohome.com"
        }

        await request(app)
            .put(`/api/blogs/asd7a6s5d76a5sd7`)
            .send(newDataForBlog)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(404)

    })

    it ('Should delete blog by id ', async () => {

        const data: BlogInputModelType = {
            name: "Home",
            description: "a wanna go home",
            websiteUrl: "https://gohome.com"
        }

        const {createdBlog} = await createBlogManager.createBlog(data, 201)


        await request(app)
            .delete(`/api/blogs/${createdBlog.id}`)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(204)

    })
    it ('Should not delete blog by incorrect id ', async () => {

        await request(app)
            .delete(`/api/blogs/khj2g34jh2g3jh4`)
            .withCredentials(true)
            .set('Authorization', 'Basic YWRtaW46cXVlcnR5')
            .expect(404)

    })

    afterAll(done => {
        done()
    })


})