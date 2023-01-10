const request = require("supertest");
const { createApp } = require("../api/index");
const { Sequelize } = require('sequelize')

describe('FEED API', () => {
    let app;

    beforeAll(async () => {
        app = await createApp();
        const sequelize = new Sequelize('hgstest', 'root', 'Sickomysql1!', {
            host : 'localhost',
            dialect : 'mysql'
        })
    });

    afterAll(async () => {
        sequelize.close();
    });

    test('FAILED: Add Post Key Error', async () => {
        await request(app)
            .post('/feed')
            .send({
                title: '',
                content: 'Content',
            })
            .expect(400)
            .expect({error: true, message: 'KEY_ERROR'})
    })
})
