const { patchTask } = require("../../db/memory");
const { body, param, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.patch(
    '/:uuid',

    param('uuid').isUUID(4),
    body('name').optional().isLength({ max: 20 }),
    body('done').optional().isBoolean(),
    body('createdAt').optional().isDate(),

    async function (req, res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uuid } = req.params;

        const task = req.body;

        const result = await patchTask({ uuid, ...task });

        return res.status(result.code).send(result.message);
    }
);

module.exports = router;