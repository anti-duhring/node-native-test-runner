const { describe, it, after, before } = require('mocha')
const supertest = require('supertest')
const assert = require('assert')

describe('API Suite test', () => {
    let app;
    before(done => {
        app = require('./api');
        app.once('listening', done)
    })
    after(done => app.close(done))
    describe('GET /contact', () => {
        it('Should request contact page and return status 200', async () => {
            const response = await supertest(app)
            .get('/contact')
            .expect(200)

            assert.strictEqual(response.text, 'contact us')
        })
    })

    describe('POST /login', () => {
        it('Should request login page and return status 200', async () => {
            const response = await supertest(app)
            .post('/login')
            .send({ username: 'foo', password: 'bar' })
            .expect(200)

            assert.strictEqual(response.text, 'ok')
        })
        it('Should request login page and return status 401', async () => {
            const response = await supertest(app)
            .post('/login')
            .send({ username: 'fo', password: 'baz' })
            .expect(401)

            assert.ok(response.unauthorized)
            assert.strictEqual(response.text, 'Login failed!')
        })
    })
    describe('GET /any', () => {
        it('Should request any page and return status 404', async () => {
            const response = await supertest(app)
            .get('/any')
            .expect(404)

            assert.ok(response.notFound)
            assert.strictEqual(response.text, 'Not found')
        })  
    })
})