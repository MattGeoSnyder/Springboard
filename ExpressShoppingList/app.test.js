process.env.NODE_ENV = 'test';

const request = require("supertest");

const app = require('./app.js');
let items = require('./fakeDb.js');
const { describe, beforeEach, afterEach } = require("node:test");

let cake = {name: 'cake', price: 5.00};

describe('Testing Item Routes', () => { 
    beforeEach(() => {
        items.push(cake);
    });

    test("Testing get /items", async () => {
        let res = await request(app).get('/items');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([cake]);
    });

    test("Testing post /items", async () => {
        let apple = {name: 'apple', price: 1.25};
        let res = await request(app).post('/items')
            .send(apple)
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({added: apple});
    });

    test("Testing successful get /items/:name", async () => {
        let res = await request(app).get('/items/cake');
        expect(res.body).toEqual(cake);
    });

    test("Testing unsuccessful get /items/:name", async () => {
        let res = await request(app).get('/items/chicken');
        expect(res.statusCode).toBe(404);
    });

    test('Testing successful patch /item/:name', async() => {
        let beer = {name: 'beer', price: 5.00}
        let res = await request(app).patch('/items/cake')
            .send(beer);
        exect(res.body).toEqual({updated: beer});
    });

    test('Testing unsuccessful patch /item/:name', async () => {
        let beer = {name: 'beer', price: 5.00}
        let res = await request(app).patch('/items/chicken')
            .send(beer);
        expect(res.statusCode).toBe(404);
    });

    test('Testing successful delete /item/:name', async () => {
        let res = await request(app).delete('/items/cake')
        expect(res.body.message).toEqual('Deleted');
    })

    test('Testing unsuccessful delete /item/:name', async () => {
        let res = await request(app).delete('/items/chicken');
        expect(res.statusCode).toBe(404);
    })

    afterEach(() => {
        items.length = 0;
    })
})