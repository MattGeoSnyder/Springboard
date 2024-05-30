process.env.NODE_ENV = 'test';

let request = require('supertest');
let bookSchema = require('../schemas/bookSchema.js');
let validate = require('jsonschema').validate;

const app = require('../app.js');
const db = require('../db.js');
let Book = require('../models/book.js');

let book;
beforeEach(async () => {
    await db.query('DELETE FROM books');
    book = {
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
      }
    await Book.create(book);
})

describe("Testing book routes", () => {
    test('Testing get /books', async () => {
        let res = await request(app).get('/books');
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ books: [book] });
    });
    describe("Testing get /books/isbn", () => {
        test('Testing valid isbn', async () => {
            let res = await request(app).get(`/books/${book.isbn}`);
            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ book });
        });
        test('Testing invalid isbn', async () => {
            let res = await request(app).get(`/books/1234`);
            expect(res.statusCode).toBe(404);
        })
    });
    describe("Testing post /", () => {
        
        test('Testing successful new book post', async () => {
            book.isbn = "0691161519";
            book.author = "Matthew Lame";
            let res = await request(app).post('/books').send(book);
            expect(res.statusCode).toBe(201);
            expect(res.body).toEqual({ book });
        });
        test('Testing missing isbn', async () => {
            delete book.isbn;

            let errors = validate(book, bookSchema).errors;

            let res = await request(app).post('/books').send(book);
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual(errors);
        });
    });

    describe("Testing put /:isbn", () => {
        test('Testing successful put', async () => {
            let bookData = {...book}
            delete bookData.isbn
            bookData.author = "Matthew Lame"

            let res = await request(app).put(`/books/${book.isbn}`).send(bookData);
            bookData.isbn = book.isbn;

            expect(res.statusCode).toBe(200);
            expect(res.body).toEqual({ book: bookData });
        });
        test('Testing unsuccessful put', async () => {
            let putSchema = {...bookSchema};
            putSchema.required = [
                "amazon_url",
                "author",
                "language",
                "pages",
                "publisher",
                "title",
                "year"
            ];

            let isbn = book.isbn;
            delete book.isbn;
            delete book.author;

            let errors = validate(book, putSchema).errors;
            
            let res = await request(app).put(`/books/${isbn}`).send(book);
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual(errors);
        });

        test('Testing delete /:isbn', async () => {
            let res = await request(app).delete(`/books/${book.isbn}`);
            expect(res.body).toEqual({ message: "Book deleted" });
        })
    })
})

afterAll(async () => {
    await db.end();
})