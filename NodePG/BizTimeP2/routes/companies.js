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

    try {
        let results = await db.query(`SELECT c.code, c.name, 
                                    c.description, i.code AS ind_code, 
                                    i.name AS ind_name FROM companies c 
                                    LEFT JOIN companies_industries ci
                                    ON c.code = ci.comp_code
                                    LEFT JOIN industries i
                                    ON ci.ind_code = i.code WHERE c.code = $1`, 
                                    [req.params.code]);

        checkQueryResults(results.rows, req.params.code);

        let {code, name, description } = results.rows[0];
        let industries = results.rows.map(r => ({ ind_code: r.ind_code, ind_name: r.ind_name }));
        return res.json({ company: {code, name, description, industries } });

    } catch (error) {
        return next(error);
    }

})

router.post('/', async (req, res, next) => {
    // debugger;
    try {
        let result = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', 
                                    [req.body.code, req.body.name, req.body.description]);
        return res.status(201).json({ company: result.rows[0] });
    } catch (error) {
        return next()
    }
})

router.patch('/:code', async (req, res, next) => {
    let results = await db.query('UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING *;', 
                                [req.body.name, req.body.description, req.params.code]);
    try {
        checkQueryResults(results.rows);
    } catch (error) {
        return next(error);
    }

    return res.json({ company: results.rows[0] });
})

router.delete('/:code', async (req, res, next) => {
    let results = await db.query('DELETE FROM companies WHERE code = $1 RETURNING *', [req.params.code]);
    
    try {
        checkQueryResults(results.rows);
    } catch (error) {
        return next(error);
    }

    return res.json({status: "deleted"});
})

module.exports = {
    companyRoutes: router
}