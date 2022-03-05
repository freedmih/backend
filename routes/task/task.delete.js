const {tryRemoveTask} = require("../../db/memory");
var express = require('express');
var router = express.Router();

router.delete('/:uuid', function (req, res) {

    const { uuid } = req.params;

    if(!tryRemoveTask(uuid)) {
        return res.send(404);
    }

    return res.send(204);
});

module.exports = router;