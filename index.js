require('dotenv').config();
const process = require('process');

const express = require('express');
const cors = require('cors');
const app = express();
const db = require("./db");

const port = process.env.PORT || 4000;

const recursive = require('recursive-readdir-sync');

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.use(cors());
app.use(express.json());

recursive(`${__dirname}/routes`)
    .forEach(file => app.use('/', require(file)));

function logErrors(err, req, res, next) {
    const errors = err.errors ? [...err.errors] : err.message;
    return res.status(err.httpCode ?? 500).json({ errors: errors });
}

app.use(logErrors);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})