import request = require('supertest')
import {app} from "../src/app";
import {postVideoType, UpdateInputVideoModel, VideoResolution, VideoTypes} from "../src/types/video.types";
import {before} from "node:test";

describe('/videos', () => {

    beforeAll(async () => {
        await request(app).delete('/testing/all-data')

    })

    // it('Should delete all videos', async () => {
    //
    //     const req = await request(app)
    //         .delete('/api/testing/all-data')
    //         .expect(204)
    //     console.log(req.body)
    // })

    let createCourse1: any = null
    it('Should add video to the db ', async () => {

        const newUser = {
            title: "Privet",
            author: "Dima",
            availableResolutions: [
                ["p144"],
            ]
        }

        const createResponse = await request(app)
            .post('/api/videos')
            .send(newUser)
            .expect(201)

        createCourse1 = createResponse.body

        // expect(createCourse1).toEqual({
        //     id: expect.any(String),
        //     title: newUser.title,
        //     author: newUser.author,
        //     canBeDownloaded: expect.any(Boolean),
        //     minAgeRestriction: 1,
        //     createdAt: expect.any(String),
        //     publicationDate: expect.any(String),
        //     availableResolutions: newUser.availableResolutions,
        //
        // })

        await request(app)
            .get('/api/videos')
            .expect(200, [createCourse1])
    })

    it('Should return list of videos', async () => {
         await request(app) //const response =
            .get('/api/videos')
            .expect(200, [createCourse1])

        // const responseEntity2 = response.body
        // expect(responseEntity2).toEqual([
        //     {
        //         id: expect.any(String),
        //         title: "Privet",
        //         author: "Dima",
        //         canBeDownloaded: expect.any(Boolean),
        //         minAgeRestriction: 1,
        //         createdAt: expect.any(String),
        //         publicationDate: expect.any(String),
        //         availableResolutions: [
        //             VideoResolution.P144,
        //         ],
        //     }
        // ])
    })

    it('Should changed video', async () => {
        const inputDataForChange = {
            title: "La-la",
            author: "Egor",
            availableResolutions: [
                "P144"
            ],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2023-11-25T22:28:44.991Z"
        }


        // const newUserModel = {
        //     title: "Poka",
        //     author: "Vasya",
        //     availableResolutions: [
        //         ["P144"],
        //     ]
        // }

        //CREATE
        // const createResponse = await request(app)
        //     .post('/api/videos')
        //     .send(newUserModel)
        //     .expect(201)

        // const newUser: VideoTypes  = createResponse.body
        //
        // await request(app)
        //     .put(`/api/videos/${newUser.id}`)
        //     .send(inputDataForChange)
        //     .expect(204)

        await request(app)
            .put(`/api/videos/${createCourse1.id}`)
            .send(inputDataForChange)
            .expect(204)

        //
        const requestedAllVideosAfterChanges = await request(app)
            .get('/api/videos')
            .expect(200, {
                ...createCourse1,
                title: "La-la",
                author: "Egor",
                availableResolutions: [
                    "P1080"
                ],
                canBeDownloaded: true,
                minAgeRestriction: 18,
                publicationDate: "2023-11-25T19:40:05.268Z"
            })
        //
        // const changedVideos: VideoTypes = requestedAllVideosAfterChanges.body.find((item: VideoTypes) => item.id === +newUser.id)
        //
        // expect(changedVideos).toEqual({
        //     id: newUser.id,
        //     title: "La-la",
        //     author: "Egor",
        //     canBeDownloaded: true,
        //     minAgeRestriction: 18,
        //     createdAt: changedVideos.createdAt,
        //     publicationDate: "2023-11-25T19:40:05.268Z",
        //     availableResolutions: [
        //         VideoResolution.P1080
        //     ],
        // })
    })

    afterAll(done => {
        done()
    })
})