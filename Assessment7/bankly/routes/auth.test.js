const User = require('../models/user');
const createTokenForUser = require('../helpers/createToken');
const request = require('supertest');
const app = require('../app');
const db = require('../db');

let u1;
beforeEach(async () => {
    u1 = {
        username: 'u1',
        password: 'test1',
        first_name: 'u',
        last_name: '1',
        email: 'u1@test.com',
        phone: '123-456-7890',
        admin: true
    }
});

afterEach(async () => {
    await db.query('DELETE FROM users');
})


afterAll(async () => {
    db.end();
})

describe('Testing POST /register', () => {
    test('works', async () => {
        let res = await request(app)
            .post('/auth/register')
            .send({...u1});
        console.log(res.body);
        expect('token' in res.body).toBeTruthy();
    })
});

describe('Testing POST /login', () => {
    test('works', async () => {
        await User.register(u1);
        let res = await request(app)
            .post('/auth/login')
            .send({ username: u1.username, password: u1.password });
        expect('token' in res.body).toBeTruthy();
    })
})