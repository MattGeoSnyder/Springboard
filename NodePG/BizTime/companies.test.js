process.env.NODE_ENV = 'test';
const app = require('./app.js');
const db  = require('./db.js');
const request = require('supertest');



let company = { code: 'apple', name: "Apple", description: "" };
beforeEach(async () => {
    let res = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3)',
                            [company.code, company.name, company.description])
})

describe('Test /companies', () => {
    test('Test get /companies', async () => {
        let res = await request(app).get('/companies');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({companies: [{ code: company.code, name: company.name }]});
    });

    test('Test post /companies', async () => {
        let res = await request(app).post('/companies').send({code: 'ibm', name: "IBM", description: ''});
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ company: {code: 'ibm', name: "IBM", description: ""} })
    })
})

describe('Test /companies/:code', () => {
    test('Test successful get /companies/:code', async () => {
        let res = await request(app).get('/companies/apple');
        expect(res.statusCode).toBe(200);
        expect(res.body.company).toEqual(company);    
    });
    test('Test unsuccessful get /companies/:code', async () => {
        let res = await request(app).get('/companies/chicken');
        expect(res.statusCode).toBe(404);
    })
    test('Test patch companies/:code', async () => {
        let res = await request(app).patch('/companies/apple').send({ name: 'APPLE', description: 'test' });
        expect(res.body).toEqual({company: {code: 'apple', name: 'APPLE', description: 'test' }})
    })
    test('Test unsucessful patch companies/:code', async () => {
        let res = await request(app).patch('/companies/chicken').send({ name: 'chkn', description: 'bawk'});
        expect(res.statusCode).toBe(404);
    })
    test("Test delete companies/:code", async () => {
        let res = await request(app).delete('/companies/apple');
        expect(res.body).toEqual({ status: "deleted" });
    })
    test("Test unsucessful delete companies/:code", async () => {
        let res = await request(app).delete('/companies/chicken');
        expect(res.statusCode).toBe(404);
    })
})


afterEach(async () => {
    await db.query('DELETE from companies');
});

afterAll(async () => {
    db.end();
})