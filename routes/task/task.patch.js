const { body, param, validationResult } = require('express-validator');
const { Task } = require("../../models/index");
var express = require('express');
const { ApiError } = require("../../errors/apiError");
const validateErrors = require("../../errors/errorWrapper");
const protect = require("../../middlewares/protect");

var router = express.Router();

router.patch(
    '/task/:uuid',
    protect,
    param('uuid').isUUID(4),
    body('name').optional().isLength({ min: 1, max: 50 }),
    body('done').optional().isBoolean(),
    body('createdAt').optional().isDate(),

    async (req, res, next) => {
        validateErrors(req);

        const { uuid } = req.params;

        const taskContent = req.body;

        const user = req.user;

        try {
            const task = await Task.update({
                ...taskContent
            }, {
                where:  {
                    uuid,
                    userId: user.id
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