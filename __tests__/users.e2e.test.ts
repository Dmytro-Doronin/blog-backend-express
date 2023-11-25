import request = require('supertest')
import {app} from "../src/app";
import {postVideoType, VideoResolution} from "../src/types/video.types";
import {before} from "node:test";

describe('/users', () => {

    // beforeAll(async () => {
    //     await request(app).delete('/testing/all-data')
    // })

    it('Should delete all videos', async () => {

        await request(app)
            .delete('/api/testing/all-data')
            .expect(204)
    })

    it('Should add videos in db ', async () => {

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

    it('Should return list of users', async () => {
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

})