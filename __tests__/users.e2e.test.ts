import request = require('supertest')
import {app} from "../src/app";
import {postVideoType, VideoResolution} from "../src/types/video.types";

describe('/users', () => {

    it('Should delete all videos', async () => {

        await request(app)
            .delete('/api/testing/all-data')
            .expect(204)
    })

    it('Should return list of users', async () => {
        await request(app)
            .get('/api/videos')
            .expect(200,  [
                    {
                        id: 0,
                        title: 'Porn',
                        author: 'Len',
                        canBeDownloaded: true,
                        minAgeRestriction: null,
                        createdAt: '2023-11-19T09:54:15.561Z',
                        publicationDate: '2023-11-19T09:54:15.561Z',
                        availableResolutions: [ 'P144' ]
                    }
                ]
            )
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
            title: "Privet",
            author: "Dima",
            canBeDownloaded: expect.any(Boolean),
            minAgeRestriction: expect(1),
            createdAt: expect.any(String),
            publicationDate: expect.any(String),
            availableResolutions: [
                VideoResolution.P144,
            ],

        })

        await request(app)
            .get('/api/videos')
            .expect(201, [createdEntity])
    })

})