const { removeTask } = require("../../db/memory");
const { param, body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.delete(
    '/:uuid',

    param('uuid').isUUID(4),

    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uuid } = req.params;

        const removeResult = await removeTask(uuid);

        return res.status(removeResult.code).send(removeResult.message);
    }
);

module.exports = router;