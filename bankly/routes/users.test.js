const User = require('../models/user');
const ExpressError = require('../helpers/expressError');
const { authUser, requireLogin, requireAdmin } = require('../middleware/auth');
const db = require('../db.js');
const createToken = require('../helpers/createToken');
const app = require('../app');
const request = require('supertest');


let u1;
let u2;
let u3;
let u1Token;
let u2Token;
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
    u2 = {
        username: 'u2',
        password: 'test2',
        first_name: 'u',
        last_name: '2',
        email: 'u2@test.com',
        phone: '123-456-7890'
    }
    u3 = {
        username: 'u3',
        password: 'test3',
        first_name: 'u',
        last_name: '3',
        email: 'u1@test.com',
        phone: '123-456-7890'
    }

    await db.query(`INSERT INTO users 
                    (username, password, first_name, last_name, phone, email, admin)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                    [u1.username, u1.password, u1.first_name, u1.last_name, u1.phone, u1.email, u1.admin]);

    await db.query(`INSERT INTO users 
                    (username, password, first_name, last_name, phone, email)
                    VALUES ($1, $2, $3, $4, $5, $6)`,
                    [u2.username, u2.password, u2.first_name, u2.last_name, u2.phone, u2.email]);

    await db.query(`INSERT INTO users 
                    (username, password, first_name, last_name, phone, email)
                    VALUES ($1, $2, $3, $4, $5, $6)`,
                    [u3.username, u3.password, u3.first_name, u3.last_name, u3.phone, u3.email]);
    
    u1Token = createToken(u1.username, u1.password);
    u2Token = createToken(u2.username);
});

afterEach(async () => {
    await db.query(`DELETE FROM users`);
})

afterAll(async () => {
    await db.end();
})

describe('Testing GET /', () => {
    test('works', async () => {
        let res = await request(app)
            .get('/users')
            .send({_token: u2Token});
        let users = [u1, u2, u3];
        users = users.map(({username, first_name, last_name}) => ({username, first_name, last_name}))
        expect(res.body).toEqual({ users });
    });
    test('fails if no auth', async () => {
        let res = await request(app)
            .get('/users');
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing GET /:username', () => {
    test('works', async () => {
        let res = await request(app)
            .get(`/users/${u1.username}`)
            .send({_token: u2Token});

        delete u1.password;
        delete u1.admin;

        expect(res.body).toEqual({user: u1});
    });
    test('fails if no auth', async () => {
        let res = await request(app)
            .get(`/users/${u1.username}`);
        expect(res.statusCode).toBe(401);
    });
});

describe('Testing PATCH /:username', () => {
    test('works', async () => {
        let res = await request(app)
            .patch(`/users/${u1.username}`)
            .send({_token: u1Token, email: 'newemail@test.com'});
        u1.email = 'newemail@test.com';
        expect(res.body).toEqual({user: u1});
    });
    test('works for admin other account', async () => {
        let res = await request(app)
            .patch(`/users/${u2.username}`)
            .send({_token: u1Token, email: 'newemail@test.com'});
        u2.email = 'newemail@test.com';
        u2.admin = false;
        expect(res.body).toEqual({user: u2});
    })
    test('fails for invalid field', async () => {
        let res = await request(app)
            .patch(`/users/${u1.username}`)
            .send({_token: u1Token, admin: false});
        u1.admin = 'username';
        expect(res.statusCode).toEqual(400);
    });
    test('fails for non-existant user', async () => {
        let res = await request(app)
            .patch('/users/nope')
            .send({_token: u1Token, email: 'blaaaah'})
        expect(res.statusCode).toEqual(404);
    });
    test('fails for non-admin other account', async () => {
        let res = await request(app)
            .patch(`/users/${u1.username}`)
            .send({_token: u2Token})
    })
});

describe('Testing DELETE /:username', () => {
    test('works for admin', async () => {
        let res = await request(app)
            .delete('/users/u3')
            .send({_token: u1Token});
        expect(res.body).toEqual({ message: 'deleted' })
    });
    test('fails for non admin', async () => {
        let res = await request(app)
            .delete('/users/u2')
            .send({_token: u2Token});
        expect(res.statusCode).toEqual(401);
    })
})