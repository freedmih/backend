const { addTask } = require("../../db/memory");
var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {

    const { name, done, createdAt } = req.body;

    const uuid = addTask({ name, done, createdAt });

    return res.send(uuid); 
});

module.exports = router;