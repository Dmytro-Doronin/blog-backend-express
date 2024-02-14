import {app} from "../../src/app";
import request = require('supertest')
import {createCommentManager} from "../utils/createCommentManager";
import {createUserPostAndBlogManager} from "../utils/createUserPostAndBlogManager";
import mongoose from "mongoose";
import {url} from "../../src/db/db";

describe('/comment', () => {

    beforeEach(async () => {
        await mongoose.connect(url)
        await request(app).delete('/api/testing/all-data')
    }, 10000)


    it('Create comment for post', async () => {

        const content = {
            content: "stringstringstringst"
        }

        const {createdPost, responseToken} = await createUserPostAndBlogManager.createAllEntities()

        const {createdComment} = await createCommentManager.createComment(content, createdPost.id, responseToken.body.accessToken, 201)
        console.log(createdComment)

    })

    it('Get all comments from specific post', async () => {

        const {createdPost, responseToken} = await createUserPostAndBlogManager.createAllEntities()

        const content1 = {
            content: "stringstringstringst"
        }

        const content2 = {
            content: "stringstringstrinstringstringstrinstringstringstrin"
        }
        const {createdComment: createdComment1} = await createCommentManager.createComment(content1, createdPost.id, responseToken.body.accessToken, 201)
        const {createdComment: createdComment2} = await createCommentManager.createComment(content2, createdPost.id, responseToken.body.accessToken, 201)

        await request(app)
            .get(`/api/posts/${createdPost.id}/comments`)
            .expect(200, {
                pagesCount: 1,
                page: 1,
                pageSize: 10,
                totalCount: 2,
                items: [createdComment2, createdComment1]
            })

    })

    it('Change comment from specific post', async () => {

        const {createdPost, responseToken} = await createUserPostAndBlogManager.createAllEntities()

        const content = {
            content: "stringstringstringst"
        }

        const {createdComment} = await createCommentManager.createComment(content, createdPost.id, responseToken.body.accessToken, 201)

        const newContent = {
            content: "Mama-ama-criminal Mama-ama-criminal Mama-ama-criminal"
        }
        await request(app)
            .put(`/api/comments/${createdComment.id}`)
            .send(newContent)
            .set('Authorization', `Bearer ${responseToken.body.accessToken}`)
            .withCredentials(true)
            .expect(204)

    })

    it('Get comment by id', async () => {

        const {createdPost, responseToken} = await createUserPostAndBlogManager.createAllEntities()

        const content = {
            content: "stringstringstringst"
        }

        const {createdComment} = await createCommentManager.createComment(content, createdPost.id, responseToken.body.accessToken, 201)

        await request(app)
            .get(`/api/comments/${createdComment.id}`)
            .expect(200, createdComment)

    })

    it('Delete comment from specific post by id', async () => {

        const {createdPost, responseToken} = await createUserPostAndBlogManager.createAllEntities()

        const content = {
            content: "stringstringstringst"
        }

        const {createdComment} = await createCommentManager.createComment(content, createdPost.id, responseToken.body.accessToken, 201)

        await request(app)
            .delete(`/api/comments/${createdComment.id}`)
            .set('Authorization', `Bearer ${responseToken.body.accessToken}`)
            .withCredentials(true)
            .expect(204)

    })
    afterAll(async () => {
        await mongoose.connection.close()
    })

})