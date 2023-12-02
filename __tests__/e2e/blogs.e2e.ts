import request = require('supertest')
import {app} from "../../src/app";

describe('/blogs', () => {

    beforeEach(async () => {
        await request(app).delete('/testing/all-data')
    })

    it ('Should add blog to the db', async () => {

    })
})