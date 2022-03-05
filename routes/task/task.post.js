const tasks = require("./../../db/memory");
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    const { uuid, name, done, createdAt } = req.body;

    tasks.push({ uuid, name, done: done ?? false, createdAt: createdAt ?? new Date().toUTCString()});
    return res.send(req.body);
});

module.exports = router;