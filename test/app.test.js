const app = require('../src/app')

describe('app', () => {
    it('GET/ responds with 200 containing Template Project', () => {
        return supertest(app)
                .get('/')
                .expect(200, '"Template Project"')
    })
})