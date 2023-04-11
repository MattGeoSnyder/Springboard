const express = require('express');
const router = new express.Router();

let items = require('./fakeDb.js');
const QueryError = require('./Errors.js');

function queryItem(name) {
    let item = items.filter((val) => val.name === name);
    if (item[0]) {
        return item[0];
    } else {
        throw new QueryError(400);
    }
}

router.get('/', (req, res, next) => {
    return res.send(items);
});

router.post('/', (req, res, next) => {
    // debugger;
    let item = req.body;
    items.push(item)
    return res.status(201).send({ added: item });
});

router.get('/:name', (req, res, next) => {
    let name = req.params.name;
    try {
        let item = queryItem(name);
        return res.send(item);
    } catch (error) {
        return next(error);
    }
});

router.patch("/:name", (req, res, next) => {
    let name = req.params.name;
    try {
        let item = queryItem(name);
        item.name = req.body.name;
        return res.send({updated: item});    
    } catch (error) {
        return next(error);
    }
});

router.delete('/:name', (req, res, next) => {
    let name = req.params.name;
    items.forEach((val, i, arr) => {
        if (val.name === name) {
            arr.splice(i,1);
            return res.send({message: "Deleted"})
        }
    });
    throw new QueryError(400);
});


module.exports =  router;
    