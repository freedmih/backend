const { removeTask } = require("../../helpers/dbHelper");
const { param, body, validationResult } = require('express-validator');
var express = require('express');
var router = express.Router();

router.delete(
    '/:uuid',

    param('uuid').isUUID(4),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uuid } = req.params;
        
        try {
            const index = await removeTask(uuid);
            if (index >= 0) {
                res.status(204).end();
            }
        }
        catch(err) {
            next(err)
        }
    }
);

module.exports = router;