const { patchTask } = require("../../helpers/dbHelper");
const { body, param, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.patch(
    '/:uuid',

    param('uuid').isUUID(4),
    body('name').optional().isLength({ min: 1, max: 50 }),
    body('done').optional().isBoolean(),
    body('createdAt').optional().isDate(),

    async function (req, res, next) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uuid } = req.params;

        const task = req.body;

        try {
            await patchTask({ uuid, ...task });
            if (index >= 0) {
                res.status(204).end();
            }
        }
        catch(err) {
            next(err);
        }
    }
);

module.exports = router;