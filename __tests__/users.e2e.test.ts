import request = require('supertest')
import {app} from "../src/app";
import {postVideoType, UpdateInputVideoModel, VideoResolution, VideoTypes} from "../src/types/video.types";
import {before} from "node:test";

describe('/videos', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')

    })

    let createCourse1: any = null
    it('Should add video to the db ', async () => {

        const newUser = {
            title: "Privet",
            author: "Dima",
            availableResolutions: [
                "P144",
            ]
        }

        const createResponse = await request(app)
            .post('/api/videos')
            .send(newUser)
            .expect(201)

        createCourse1 = createResponse.body

        await request(app)
            .get('/api/videos')
            .expect(200, [createCourse1])
    })

    it('Should not add video to the db with incorrect inputs', async () => {

        const newUser = {
            title: null,
            author: "Dima",
            availableResolutions: [
                "P144",
            ]
        }

         await request(app)
            .post('/api/videos')
            .send(newUser)
            .expect(400, { errorsMessages: [{message: "Title is required", field: "title"}] })

    })

    it('Should not add video to the db with incorrect availableResolutions', async () => {

        const newUser = {
            title: "Good luck",
            author: "Dima",
            availableResolutions: [
                "P144", "Invalid"
            ]
        }

        await request(app)
            .post('/api/videos')
            .send(newUser)
            .expect(400, { errorsMessages: [{message: "At least one resolution should be available", field: "availableResolutions"}] })

    })

    it('Should return list of videos', async () => {
         await request(app) //const response =
            .get('/api/videos')
            .expect(200, [createCourse1])

    })

    it('Should changed video', async () => {
        const inputDataForChangeVideo = {
            title: "La-la",
            author: "Egor",
            availableResolutions: [
                "P144"
            ],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2023-11-25T22:28:44.991Z"
        }

        await request(app)
            .put(`/api/videos/${createCourse1.id}`)
            .send(inputDataForChangeVideo)
            .expect(204)

        //
        await request(app)
            .get(`/api/videos/${createCourse1.id}`)
            .expect(200)
            .expect(res => {
             expect(res.body).toMatchObject({
                ...createCourse1,
                title: "La-la",
                author: "Egor",
                availableResolutions: [
                    "P144"
                ],
                canBeDownloaded: true,
                minAgeRestriction: 18,
                publicationDate: "2023-11-25T19:40:05.268Z"
            })
                // expect(new Date(res.body.createdAt).getTime()).toBeCloseTo(new Date(createCourse1.createdAt).getTime(), 1000 );
                // expect(new Date(res.body.publicationDate).getTime()).toBeCloseTo(new Date(createCourse1.publicationDate).getTime(), 1000 * 60);
            })
    })

    it('Should not change video with incorrect title', async () => {
        const inputDataForChangeVideo2 = {
            title: null,
            author: "Egor",
            availableResolutions: [
                "P144"
            ],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2023-11-25T22:28:44.991Z"
        }

        await request(app)
            .put(`/api/videos/${createCourse1.id}`)
            .send(inputDataForChangeVideo2)
            .expect(400, {
                errorsMessages: [
                    {message: "Title is required", field: "title"}
                ]
            })
    })

    it('Should not change video with incorrect canBeDownloaded', async () => {
        const inputDataForChangeVideo2 = {
            title: "Vsem Privet",
            author: "Egor",
            availableResolutions: [
                "P144"
            ],
            canBeDownloaded: undefined,
            minAgeRestriction: 18,
            publicationDate: "2023-11-25T22:28:44.991Z"
        }

        await request(app)
            .put(`/api/videos/${createCourse1.id}`)
            .send(inputDataForChangeVideo2)
            .expect(400, {
                errorsMessages: [
                    {message: "Not correct canBeDownloaded", field: "canBeDownloaded"}
                ]
            })
    })

    it('Should not change video with incorrect minAgeRestriction', async () => {
        const inputDataForChangeVideo2 = {
            title: "Vsem Privet",
            author: "Egor",
            availableResolutions: [
                "P144"
            ],
            canBeDownloaded: false,
            minAgeRestriction: 25,
            publicationDate: "2023-11-25T22:28:44.991Z"
        }

        await request(app)
            .put(`/api/videos/${createCourse1.id}`)
            .send(inputDataForChangeVideo2)
            .expect(400, {
                errorsMessages: [
                    {message: "Not currentAgeRestriction range", field: "minAgeRestriction"}
                ]
            })
    })

    it('Should delete video from the the db ', async () => {

        const id = createCourse1.id

        await request(app)
            .delete(`/api/videos/${id}`)
            .expect(204)
    })

    it('Should not delete video from the db with incorrect id ', async () => {

        const id = 123123123123123

        await request(app)
            .delete(`/api/videos/${id}`)
            .expect(404)
    })

    afterAll(done => {
        done()
    })
})