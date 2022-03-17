const { param, body, validationResult } = require('express-validator');
const express = require('express');
const { ApiError } = require("../../errors/apiError");
const { ValidationError } = require("../../errors/validationError");
const validateErrors = require("../../errors/errorWrapper");
const protect = require("../../middlewares/protect");


const { Task } = require("../../models/index");

const router = express.Router();

router.delete(
    '/task/:uuid',
    protect,
    param('uuid').isUUID(4).withMessage('uuid_validation'),

    async (req, res, next) => {
        const { uuid } = req.params;

        const userId = res.locals.user_id;

        try {
            validateErrors(req, res);

            const count = await Task.destroy({
                where: { uuid, user_id: userId }
            });

            if (count === 0)
                throw new ApiError('task_not_found', 404);

            return res.sendStatus(204);
        }
        catch (err) {
            next(err)
        }
    }
);

module.exports = router;