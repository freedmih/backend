const tasks = require("./../../db/memory");
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    return res.send(tasks);
});

module.exports = router;