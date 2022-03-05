const {tryRemoveTask} = require("../../db/memory");
var express = require('express');
var router = express.Router();

router.delete('/:uuid', async function (req, res) {

    const { uuid } = req.params;

    const removeResult = await removeTask(uuid);

    return res.status(removeResult.code).send(removeResult.message);
});

module.exports = router;