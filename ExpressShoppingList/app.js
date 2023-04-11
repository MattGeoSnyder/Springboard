const express = require('express');
const itemRoutes = require('./itemRoutes.js');
const app = express();

app.use(express.json());
app.use('/items', itemRoutes);

app.use((error, req, res, next) => {
    res.status(error.status).send(error.msg);
})


module.exports = app;