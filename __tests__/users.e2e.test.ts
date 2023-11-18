import request from 'supertest'
import {app} from "../src/setting";

describe('/users', () => {

    it('Should return list of users', async () => {
        await request(app)
            .get('/api/users')
            .expect(200, [
                {id: 1, name: 'Dima', age: '29'},
                {id: 2, name: 'Vasa', age: '22'},
                {id: 3, name: 'Petya', age: '23'},
            ])
    })

})