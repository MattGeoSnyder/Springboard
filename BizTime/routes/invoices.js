const express = require('express');
const router = new express.Router();
const db = require('../db.js');
let ExpressError = require('../expressError.js');

function checkQueryResults(results, code) {
    if (results.length === 0) {
        throw new ExpressError(`Cannot find company with id: ${code}`, 404);
    }
}

router.get('/', async (req, res, next) => {
    // debugger;
    try {
        let results = await db.query('SELECT id, comp_code FROM invoices;');
        return res.json({ invoices: results.rows });
    } catch (error) {
        return next()
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        let result = await db.query('SELECT * FROM invoices WHERE id = $1;', [req.params.id]);
        checkQueryResults(result.rows, req.params.id);
        return res.json({ invoice: result.rows[0] });
    } catch (error) {
        return next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let result = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *;', [req.body.comp_code, req.body.amt]);
        return res.json({ invoice: result.rows[0] });
    } catch (error) {
        return next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        let result = await db.query('UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING *;', [req.body.amt, req.params.id]);
        checkQueryResults(result.rows, req.params.id);
        return res.json({ invoice: result.rows[0] })
    } catch (error) {
        return next(error);
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        let result = await db.query('DELETE FROM invoices WHERE id = $1 RETURNING *;', [req.params.id]);
        checkQueryResults(result.rows, req.params.id);
        return res.json({status: "Deleted"});
    } catch (error) {
        return next(error);
    }
})

module.exports = {
    invoiceRoutes: router
}