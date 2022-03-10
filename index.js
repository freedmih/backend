require('dotenv').config();
const process = require('process');

const express = require('express');
const app = express();
const db = require("./db");

const port = process.env.PORT || 3000;

const recursive = require('recursive-readdir-sync');

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(express.json());

recursive(`${__dirname}/routes`)
    .forEach(file => app.use('/', require(file)));

function logErrors(err, req, res, next) {
    console.log(err);
    return res.status(err.httpCode ?? 500).json({ errors: [...err.errors] });
}

app.use(logErrors);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})