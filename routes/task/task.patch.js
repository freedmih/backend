const { body, param, validationResult } = require('express-validator');
const { Task } = require("../../models/task.model");
var express = require('express');
const { ApiError } = require("../../helpers/error");
var router = express.Router();

router.patch(
    '/:uuid',

    param('uuid').isUUID(4),
    body('name').optional().isLength({ min: 1, max: 50 }),
    body('done').optional().isBoolean(),
    body('createdAt').optional().isDate(),

    async function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { uuid } = req.params;

        const taskContent = req.body;

        try {
            const task = await Task.update({
                ...taskContent
            }, {
                where:  {
                    uuid
                }
            })

            if (!task)
                throw new ApiError("Task hasn't update", 422);

            res.status(204).end();
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;