import request = require('supertest')
import {app} from "../src/app";

describe('/users', () => {



    it('Should return list of users', async () => {
        await request(app)
            .get('/api/videos')
            .expect(200, [
                {id: 1, name: 'Dima', age: '29'},
                {id: 2, name: 'Vasa', age: '22'},
                {id: 3, name: 'Petya', age: '23'},
            ])
    })

})