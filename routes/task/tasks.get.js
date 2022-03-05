const { getTasks } = require("../../db/memory");
var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {

    const tasks = await getTasks();

    return res.json(tasks);
});

module.exports = router;