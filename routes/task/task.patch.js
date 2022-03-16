const { body, param, validationResult } = require('express-validator');
const { Task } = require("../../models/index");
const express = require('express');
const { ApiError } = require("../../errors/apiError");
const validateErrors = require("../../errors/errorWrapper");
const protect = require("../../middlewares/protect");

const router = express.Router();

router.patch(
    '/task/:uuid',
    protect,
    param('uuid').isUUID(4).withMessage('uuid_validation'),
    body('name').optional().isLength({ min: 1, max: 50 }).withMessage('name_validation'),
    body('done').optional().isBoolean().withMessage('done_validation'),
    body('createdAt').optional().isDate().withMessage('createdAt_validation'),

    async (req, res, next) => {
        validateErrors(req, res);

        const { uuid } = req.params;

        const taskContent = req.body;

        const user = req.user;

        try {
            const task = await Task.update({
                ...taskContent
            }, {
                where:  {
                    uuid,
                    UserId: user.id
                }
            })

            if (!task)
                throw new ApiError('task_hasnt_update', 422);

            res.status(204).end();
        }
        catch (err) {
            next(err);
        }
    }
);

module.exports = router;