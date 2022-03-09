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
            const removeResult = await removeTask(uuid);
            return res.status(204);
        }
        catch(err) {
            next(err)
        }
    }
);

module.exports = router;