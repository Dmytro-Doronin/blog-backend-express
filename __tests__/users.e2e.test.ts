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
    //     await request(app)
    //         .delete('/api/testing/all-data')
    //         .expect(204)
    // })

    // let createdEntity = null
    it('Should add video to the db ', async () => {

        const newUser: postVideoType = {
            title: "Privet",
            author: "Dima",
            availableResolutions: [
                VideoResolution.P144,
            ]
        }

        const createResponse = await request(app)
            .post('/api/videos')
            .send(newUser)
            .expect(201)

       const createdEntity = createResponse.body

        expect(createdEntity).toEqual({
            id: expect.any(String),
            title: newUser.title,
            author: newUser.author,
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: 1,
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: newUser.availableResolutions,

        })

        await request(app)
            .get('/api/videos')
            .expect(200, [createdEntity])
    })
    it('Should return list of videos', async () => {
        const response = await request(app)
            .get('/api/videos')
            .expect(200)

        const responseEntity2 = response.body
        expect(responseEntity2).toEqual([
            {
                id: expect.any(String),
                title: "Privet",
                author: "Dima",
                canBeDownloaded: expect.any(Boolean),
                minAgeRestriction: 1,
                createdAt: expect.any(String),
                publicationDate: expect.any(String),
                availableResolutions: [
                    VideoResolution.P144,
                ],
            }
        ])
    })

    it('Should changed first video', async () => {
        const inputDataForChange: UpdateInputVideoModel = {
            title: "La-la",
            author: "Egor",
            availableResolutions: [
                VideoResolution.P144
            ],
            canBeDownloaded: true,
            minAgeRestriction: 18,
            publicationDate: "2023-11-25T19:40:05.268Z"
        }

        
        const requestedAllVideosBeforeChanged = await request(app)
            .get('/api/videos')
            .expect(200)

        const firstVideo: VideoTypes  = requestedAllVideosBeforeChanged.body[0]

        await request(app)
            .put(`/api/videos/${firstVideo.id}`)
            .send(inputDataForChange)
            .expect(204)

        const requestedAllVideosAfterChanges = await request(app)
            .get('/api/videos')
            .expect(200)

        const changedVideos: VideoTypes = requestedAllVideosAfterChanges.body.find((item: VideoTypes) => item.id === firstVideo.id)

        expect(changedVideos).toEqual({
            id: firstVideo.id,
            title: "La-la",
            author: "Egor",
            canBeDownloaded: true,
            minAgeRestriction: 18,
            createdAt: changedVideos.createdAt,
            publicationDate: "2023-11-25T19:40:05.268Z",
            availableResolutions: [
                VideoResolution.P1080
            ],
        })
    })

})