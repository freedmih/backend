const express = require('express');
const app = express();
const port = 3000;

const recursive = require('recursive-readdir-sync');

app.use(express.json());

recursive(`${__dirname}/routes`)
    .forEach(file => app.use('/', require(file)));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})