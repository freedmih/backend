const { tryPatchTask } = require("../../db/memory");
var express = require('express');
var router = express.Router();

router.patch('/:uuid', async function (req, res) {

    const { uuid } = req.params;

    const task = req.body;

    const result = await tryPatchTask({ uuid, ...task });

    return res.status(result.code).send(result.message);
});

module.exports = router;