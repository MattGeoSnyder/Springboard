const express = require('express');
const router = new express.Router();
const db = require('../db.js');
let ExpressError = require('../expressError.js');

function checkQueryResults(results, code) {
    if (results.length === 0) {
        throw new ExpressError(`Cannot find company with code ${code}`, 404);
    }
}

router.get('/', async (req, res, next) => {
    let results = await db.query('SELECT code, name from companies');
    return res.json({ companies: results.rows });
})

router.get('/:code', async (req, res, next) => {
    let results = await db.query('SELECT * FROM companies WHERE code = $1', [req.params.code]);

    try {
        checkQueryResults(results.rows, req.params.code);
    } catch (error) {
        return next(error);
    }

    return res.json({ company: results.rows[0] });
})

router.post('/', async (req, res, next) => {
    // debugger;
    try {
        let result = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', 
                                    [req.body.code, req.body.name, req.body.description]);
        return res.json({ company: result.rows[0] });
    } catch (error) {
        return next()
    }
})

router.patch('/:code', async (req, res, next) => {
    let results = await db.query('UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING *', 
                                [req.body.name, req.body.description, req.params.code]);
    try {
        checkQueryResults(results);
    } catch (error) {
        return next(error);
    }

    return res.json({ company: results.rows[0] });
})

router.delete('/:code', async (req, res, next) => {
    let results = await db.query('DELETE FROM companies WHERE code = $1 RETURNING *', [req.params.code]);
    
    try {
        checkQueryResults(results);
    } catch (error) {
        return next(error);
    }

    return res.json({status: "deleted"});
})

module.exports = {
    companyRoutes: router
}