const express = require("express");
const Book = require("../models/book");

const router = new express.Router();

const bookSchema = require('../schemas/bookSchema.js');
const validate = require('jsonschema').validate;


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    return res.json({ books });
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
  try {
    let isbn = req.params.id;
    let isbnSchema = bookSchema.properties.isbn;
    let result = validate(isbn, { isbnSchema });

    if (!result.valid) {
      return res.send(res.errors);
    }

    const book = await Book.findOne(req.params.id);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  // debugger;
  try {
    let bookData = req.body;
    let result = validate(bookData, bookSchema);

    if (!result.valid) {
      return res.status(400).send(result.errors);
    }

    const book = await Book.create(req.body);
    return res.status(201).json({ book });
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    let bookData = req.body;
    let updateSchema = {...bookSchema};
    updateSchema.required = [
      "amazon_url",
      "author",
      "language",
      "pages",
      "publisher",
      "title",
      "year"
    ]

    let result = validate(bookData, updateSchema);

    if (!result.valid) {
      return res.status(400).send(result.errors);
    }

    const book = await Book.update(req.params.isbn, req.body);
    return res.json({ book });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    let isbn = req.params.id;
    let isbnSchema = bookSchema.properties.isbn;
    let result = validate(isbn, { isbnSchema });

    if (!result.valid) {
      return res.send(res.errors);
    }

    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
